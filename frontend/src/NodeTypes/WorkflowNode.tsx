import React, { memo, useRef, useState, useEffect } from "react";
import {
  Handle,
  Position,
  NodeProps,
  NodeToolbar,
  useReactFlow,
} from "reactflow";
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
  const { deleteElements } = useReactFlow();
  const handleChange = (e) => {
    setText(e.target.value);
  };
  //const onDelete = () => deleteElements({ nodes: [{ id }] });

  return (
    <div
      onClick={onClick}
      className={cx(styles.node)}
      title="click to add a child node"
    >
      {/* <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar> */}
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
