/**
 * This example shows how you can use custom nodes and edges to dynamically add elements to your react flow graph.
 * A global layouting function calculates the new positions for the nodes every time the graph changes and animates existing nodes to their new position.
 *
 * There are three ways of adding nodes to the graph:
 *  1. Click an existing node: Create a new child node of the clicked node
 *  2. Click on the plus icon of an existing edge: Create a node in between the connected nodes of the edge
 *  3. Click a placeholder node: Turn the placeholder into a "real" node to prevent jumping of the layout
 *
 * The graph elements are added via hook calls in the custom nodes and edges. The layout is calculated every time the graph changes (see hooks/useLayout.ts).
 **/
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Edge,
  Node,
  addEdge,
  ProOptions,
  ReactFlowProvider,
  useReactFlow,
  Controls,
  MarkerType,
} from "reactflow";
import { uuid, randomLabel } from "./utils";
import { hierarchy as d3Hierarchy, tree as d3Tree } from "d3-hierarchy";
import { scaleLinear as d3ScaleLinear } from "d3-scale";

import useLayout from "./hooks/useLayout";
import nodeTypes from "./NodeTypes";
import edgeTypes from "./EdgeTypes";
import Header from "./components/Header";
import axios from "axios";
axios.defaults.baseURL = "http://143.110.235.105:8080";

import "reactflow/dist/style.css";
import data from "./tree";
const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };

type DataType = {
  name: string;
  expanded?: boolean;
  id?: string;
  children?: any;
};
const hierarchy = d3Hierarchy<DataType>(data[0]);

hierarchy.descendants().forEach((d, i) => {
  d.data.expanded = true;
  d.data.id = `${i}`;
  d.data.children = d.children;
  d.children = d.data.children;
});

const layout = d3Tree<DataType>().nodeSize([25, 200]);

function getElements() {
  hierarchy.descendants().forEach((d, i) => {
    //d.children = d.data.expanded ? d.data.children : null;
    d.children = d.data.children;
  });
  console.log(hierarchy);

  const root = layout(hierarchy);

  const nodes: Node[] = root.descendants().map((d) => ({
    id: d.data.id,
    data: { label: d.data.name, depth: d.depth },
    position: { x: d.y, y: d.x },
    type: d.data.children ? "workflow" : "placeholder",
  }));

  const edges: Edge[] = root.links().map((d, i) => ({
    id: `${d.source.data.id}=>${d.target.data.id}`,
    source: d.source.data.id,
    target: d.target.data.id,
    type: d.target.data.name == "+" ? "placeholder" : "mainfix",
  }));

  return { nodes, edges };
}

const initialElements = getElements();
// initial setup: one workflow node and a placeholder node
// placeholder nodes can be turned into a workflow node by click

const fitViewOptions = {
  padding: 0.95,
};

function ReactFlowPro() {
  // this hook call ensures that the layout is re-calculated every time the graph changes
  useLayout();
  const { getNode, setNodes, setEdges, project, getNodes, getEdges } =
    useReactFlow();

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [chartCount, setChartCount] = useState(0);
  const [curChart, setCurChart] = useState(-1);
  useEffect(() => {
    (async () => {
      const res = await axios.get("getCount?name=test");
      setChartCount(res.data.count);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (curChart >= 0) {
        console.log("start");
        const res = await axios.get(`getChart?name=test&index=${curChart}`);
        const nodesData = res.data.data.nodes;
        const edgesData = res.data.data.edges;
        console.log(edgesData);
        const newNodes = nodesData.map((node) => {
          return {
            id: node.id,
            position: { x: 100, y: 100 },
            data: node.data,
            type: node.type,
          };
        });
        const newEdges = edgesData.map((edge) => {
          return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
          };
        });
        setNodes(newNodes);
        setEdges(newEdges);
        useLayout();
      }
    })();
  }, [curChart]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const saveChart = async () => {
    const nodes = getNodes();
    const edges = getEdges();
    const res = await axios.post("add", {
      nodes,
      edges,
      name: "test",
    });
    console.log(res.data);
    setChartCount(res.data.count);
  };

  const addUser = () => {
    axios.post("user", {
      name: "test",
      mail: "test@gmail.com",
    });
  };

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const childNodeId = uuid();
        const childNodeId1 = uuid();

        const childNode = {
          id: childNodeId,
          position: { x: 100, y: 200 },
          type: "workflow",
          data: { label: "Temp" },
        };
        const childNode1 = {
          id: childNodeId1,
          position: { x: 200, y: 200 },
          type: "placeholder",
          data: { label: "+" },
        };
        const childEdge = {
          id: `${connectingNodeId.current}=>${childNodeId}`,
          source: connectingNodeId.current,
          target: childNodeId,
          type: "workflow",
          markerEnd: { type: MarkerType.ArrowClosed, color: "red" },
        };
        const childEdge1 = {
          id: `${childNodeId}=>${childNodeId1}`,
          source: childNodeId,
          target: childNodeId1,
          type: "placeholder",
        };
        setNodes((nodes) => nodes.concat([childNode, childNode1]));
        setEdges((edges) => edges.concat([childEdge, childEdge1]));
      }
    },
    [project]
  );

  return (
    <>
      <Header
        saveChart={saveChart}
        addUser={addUser}
        chartCount={chartCount}
        setCurChart={setCurChart}
      />
      <ReactFlow
        defaultNodes={initialElements.nodes}
        defaultEdges={initialElements.edges}
        proOptions={proOptions}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        minZoom={0.2}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodesDraggable={true}
        nodesConnectable={true}
        zoomOnDoubleClick={false}
      >
        <Background />
      </ReactFlow>
      <Controls />
    </>
  );
}

function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
