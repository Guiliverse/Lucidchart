import { MarkerType, NodeProps, useReactFlow } from "reactflow";

import { uuid, randomLabel } from "../utils";

// this hook implements the logic for clicking a placeholder node
// on placeholder node click: turn the placeholder and connecting edge into a workflow node
export function usePlaceholderClick(id: NodeProps["id"]) {
  const { getNode, setNodes, setEdges } = useReactFlow();

  const onClick = () => {
    // we need the parent node object for getting its position
    const curNode = getNode(id);
    let parNode = null;
    setEdges((edges) =>
      edges.map((edge) => {
        // here we are changing the type of the connecting edge from placeholder to workflow
        if (edge.target === id) {
          parNode = getNode(edge.source);
          return {
            ...edge,
          };
        }
        return edge;
      })
    );

    if (!curNode) {
      return;
    }
    console.log(parNode);

    // create a unique id for the placeholder node that will be added as a child of the clicked node
    const childPlaceholderId = uuid();
    const friendPlaceholderId = uuid();

    // create a placeholder node that will be added as a child of the clicked node
    const childPlaceholderNode = {
      id: childPlaceholderId,
      // the placeholder is placed at the position of the clicked node
      // the layout function will animate it to its new position
      position: { x: curNode.position.y, y: curNode.position.x },
      type: "placeholder",
      data: { label: "+" },
    };
    const friendPlaceholderNode = {
      id: friendPlaceholderId,
      position: { x: parNode.position.y, y: parNode.position.x },
      type: "workflow",
      data: { label: "Temp" },
    };

    // we need a connection from the clicked node to the new placeholder
    const childPlaceholderEdge = {
      id: `${friendPlaceholderId}=>${childPlaceholderId}`,
      source: friendPlaceholderId,
      target: childPlaceholderId,
      type: "placeholder",
    };

    const friendWorkFlowEdge = {
      id: `${parNode.id}=>${friendPlaceholderId}`,
      source: parNode.id,
      target: friendPlaceholderId,
      type: "workflow",
      markerEnd: { type: MarkerType.ArrowClosed, color: "red" },
    };

    setNodes((nodes) =>
      nodes
        // .map((node) => {
        //   // here we are changing the type of the clicked node from placeholder to workflow
        //   if (node.id === id) {
        //     return {
        //       ...node,
        //       type: "workflow",
        //       data: { label: randomLabel() },
        //     };
        //   }
        //   return node;
        // })
        // add the new placeholder node
        .concat([childPlaceholderNode, friendPlaceholderNode])
    );

    setEdges((edges) =>
      edges
        // .map((edge) => {
        //   // here we are changing the type of the connecting edge from placeholder to workflow
        //   if (edge.target === id) {
        //     return {
        //       ...edge,
        //       type: "workflow",
        //     };
        //   }
        //   return edge;
        // })
        // add the new placeholder edge
        .concat([childPlaceholderEdge, friendWorkFlowEdge])
    );
  };

  return onClick;
}

export default usePlaceholderClick;
