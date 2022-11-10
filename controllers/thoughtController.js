//this file has the best name ever. Maybe if it were a real app this would even be true.

const { Thought, User } = require('../model');

function getThoughts(req, res) {
  Thought.find()
    .then(thoughts => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
}

function getThought(req, res) {
  Thought.findOne({ _id: req.params.id })
    .then(thought => res.json(thought))
    .catch(err => res.status(500).json(err));
}

function createThought(req, res) {
  let thoughtArr = []
  Thought.create(req.body)
    .then(thoughtObj => User.updateOne({ username: req.body.username}, { thoughts: [thoughtObj._id] })
      .then(data => {
        thoughtArr.push(thoughtObj, data);
        res.json(thoughtArr);
      })
      .catch(err => res.status(500).json(err)));
}

function updateThought(req, res) {
  Thought.updateOne({ _id: req.params.id }, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}

function delThought(req, res) {
  Thought.findOne({ _id: req.params.id })
    //Filter out thoughts we are deleting from users.
    .then(thought  =>
      Thought.deleteOne({ _id: req.params.id })
      .then(data => res.json(data)))
    .catch(err => res.status(500).json(err));
}

function addReaction(req, res) {
  Thought.updateOne( { _id: req.params.id }, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
}

function delReaction(req, res) {
  Thought.findOne({ _id: req.params.id }).
    then(obj => res.json(obj.reactions._id(req.params.rId).remove()))
    .catch(err => res.status(500).json(err))
}

module.exports = { getThought, getThoughts, createThought, delThought, updateThought, addReaction, delReaction }