const { Node, Edge, Tree, User } = require("../models/Chart");
const Promise = require("bluebird");

// Add New Chart History
const addChart = async (req, res) => {
  const { nodes, edges, name } = req.body;
  const nodeIds = await Promise.map(nodes, async (nodeData) => {
    const { id, data, type } = nodeData;
    const node = new Node({ id, data, type });
    const savedNode = await node.save();

    return savedNode._id;
  });

  const edgeIds = await Promise.map(edges, async (edgeData) => {
    const edge = new Edge({ ...edgeData });
    const savedEdge = await edge.save();

    return savedEdge._id;
  });

  const tree = new Tree({ node_id: nodeIds, edge_id: edgeIds });

  const savedTree = await tree.save();

  const user = await User.findOne({ name });
  const oldTrees = user.trees;
  const newTrees = [...oldTrees, savedTree._id];
  await User.updateOne({ name }, { trees: newTrees });

  return res.status(200).json({ message: "success", count: newTrees.length });
};

const addUser = async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email, trees: [] });
  await user.save();
};

const getCount = async (req, res) => {
  const { name } = req.query;
  const user = await User.findOne({ name });
  if (user && user.trees) {
    return res
      .status(200)
      .json({ message: "success", count: user.trees.length });
  }
  return res.status(200).json({ message: "success", count: 0 });
};

const getChart = async (req, res) => {
  const { name, index } = req.query;
  const user = await User.findOne({ name });
  const treeId = user.trees[index];
  const { node_id, edge_id } = await Tree.findById(treeId);
  const nodes = await Promise.map(node_id, async (id) => {
    const nodeInfo = await Node.findById(id);
    return nodeInfo;
  });
  const edges = await Promise.map(edge_id, async (id) => {
    const edgeInfo = await Edge.findById(id);
    return edgeInfo;
  });

  return res.status(200).json({ message: "success", data: { nodes, edges } });
};

module.exports = {
  addChart,
  addUser,
  getCount,
  getChart,
};
