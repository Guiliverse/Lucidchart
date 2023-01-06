import { useCallback } from "react";
import { NodeProps, useReactFlow, getOutgoers } from "reactflow";

import { uuid, randomLabel } from "../utils";

// this hook implements the logic for clicking a workflow node
// on workflow node click: create a new child node of the clicked node
export function useNodeClick(id: NodeProps["id"]) {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  const onClick = useCallback(() => {
    // we need the parent node object for positioning the new child node
    const parentNode = getNode(id);

    if (!parentNode) {
      return;
    }
    
  }, [getEdges, getNode, getNodes, id, setEdges, setNodes]);

  return onClick;
}

export default useNodeClick;
