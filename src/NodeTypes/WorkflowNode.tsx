import React, { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
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
        isConnectable={false}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={Position.Right}
        isConnectable={false}
      />
    </div>
  );
};

export default memo(WorkflowNode);
