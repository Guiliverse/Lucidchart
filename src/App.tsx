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
import React from "react";
import ReactFlow, {
  Background,
  Edge,
  Node,
  ProOptions,
  ReactFlowProvider,
  MarkerType,
  Controls,
} from "reactflow";
import { hierarchy as d3Hierarchy, tree as d3Tree } from "d3-hierarchy";
import { scaleLinear as d3ScaleLinear } from "d3-scale";

import useLayout from "./hooks/useLayout";
import nodeTypes from "./NodeTypes";
import edgeTypes from "./EdgeTypes";

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
/*const defaultNodes: Node[] = [
  {
    id: "1",
    data: { label: "🌮 Taco" },
    position: { x: 0, y: 0 },
    type: "workflow",
  },
  {
    id: "2",
    data: { label: "+" },
    position: { x: 0, y: 100 },
    type: "placeholder",
  },
  {
    id: "3",
    data: { label: "child1" },
    position: { x: 0, y: 100 },
    type: "workflow",
  },
  {
    id: "4",
    data: { label: "child2" },
    position: { x: 0, y: 100 },
    type: "workflow",
  },
  {
    id: "5",
    data: { label: "+" },
    position: { x: 0, y: 100 },
    type: "placeholder",
  },
  {
    id: "6",
    data: { label: "+" },
    position: { x: 0, y: 100 },
    type: "placeholder",
  },
];*/

// initial setup: connect the workflow node to the placeholder node with a placeholder edge
/*const defaultEdges: Edge[] = [
  {
    id: "1=>2",
    source: "1",
    target: "2",
    type: "placeholder",
  },
  {
    id: "1=>3",
    source: "1",
    target: "3",
    type: "workflow",
  },
  {
    id: "1=>4",
    source: "1",
    target: "4",
    type: "workflow",
  },
  {
    id: "3=>5",
    source: "3",
    target: "5",
    type: "placeholder",
  },
  {
    id: "4=>6",
    source: "4",
    target: "6",
    type: "placeholder",
  },
];*/

const fitViewOptions = {
  padding: 0.95,
};

function ReactFlowPro() {
  // this hook call ensures that the layout is re-calculated every time the graph changes
  useLayout();

  return (
    <>
      <ReactFlow
        defaultNodes={initialElements.nodes}
        defaultEdges={initialElements.edges}
        proOptions={proOptions}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        minZoom={0.2}
        nodesDraggable={false}
        nodesConnectable={false}
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
