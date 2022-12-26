import React, { memo, useRef, useState, useEffect } from "react";
import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
//import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";
import cx from "classnames";

import styles from "./NodeTypes.module.css";
import useNodeClickHandler from "../hooks/useNodeClick";

const WorkflowNode = ({ id, data }: NodeProps) => {
  // see the hook implementation for details of the click handler
  // calling onClick adds a child node to this node
  const [text, setText] = useState(data.label);
  const onClick = useNodeClickHandler(id);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  /*const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(true);
  const [rotatable, setRotatable] = useState(true);

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on("drag", (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);*/

  return (
    <div
      onClick={onClick}
      className={cx(styles.node)}
      title="click to add a child node"
    >
      <input
        value={text}
        className={cx(styles.ninput)}
        onChange={(e) => handleChange(e)}
      ></input>
      <Handle
        className={styles.handle}
        type="target"
        position={Position.Left}
        isConnectable={true}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={Position.Right}
        isConnectable={true}
      />
    </div>
  );
};

export default memo(WorkflowNode);
