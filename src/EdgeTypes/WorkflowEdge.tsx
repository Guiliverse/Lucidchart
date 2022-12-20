import React from "react";
import { EdgeProps, getSmoothStepPath, EdgeTypes } from "reactflow";

import styles from "./EdgeTypes.module.css";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}: EdgeProps) {
  // see the hook for implementation details
  // onClick adds a node in between the nodes that are connected by this edge

  const [edgePath, edgeCenterX, edgeCenterY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className={styles.edgePath}
        d={edgePath}
        type="smoothstep"
        markerEnd={markerEnd}
      />
    </>
  );
}
