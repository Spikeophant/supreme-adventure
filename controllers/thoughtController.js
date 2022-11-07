//this file has the best name ever. Maybe if it were a real app this would even be true.

const { Thought, User } = require('../model');

function getThoughts(req, res) {
  Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
}

function getThought(req, res) {
  Thought.findOne({ _id: req.params.id })
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
}

function newThought(req, res) {
  let thoughtArr = []
  Thought.create(req.body)
    .then((thoughtObj) => User.updateOne({ _id: req.body.userId}, thoughts.push(thoughtObj._id))
      .then((data) => {
        thoughtArr.push(thoughtObj, data);
        res.json(thoughtArr);
      })
      .catch((err) => res.status(500).json(err)));
}

function updateThought(req, res) {
  Thought.updateOne({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

function delThought(req, res) {
  Thought.findOne({ _id: req.params.id })
    .then((thought) => User.updateOne({ username: thought.username }, thoughts.pop(thought._id))
      .then(() => Thought.deleteOne({ _id: req.params.id })
        .then((data) => res.json(data))))
    .catch((err) => res.status(500).json(err));
}