const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
  id: String,
  data: Object,
  type: String,
});
const Node = mongoose.model("Node", NodeSchema);

const EdgeSchema = new mongoose.Schema({
  id: String,
  source: String,
  target: String,
  type: String,
});
const Edge = mongoose.model("Edge", EdgeSchema);

const TreeSchema = new mongoose.Schema({
  node_id: [{type: mongoose.Schema.Types.ObjectId, ref: "Node"}],
  edge_id: [{type: mongoose.Schema.Types.ObjectId, ref: "Edge"}],
});
const Tree = mongoose.model("Tree", TreeSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  trees: [{type: mongoose.Schema.Types.ObjectId, ref: "Tree"}]
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  Node,
  Edge,
  Tree,
  User
}
