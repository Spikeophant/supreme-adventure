const User = require ('../model/User');

function getUsers(req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
}

function getUser(req, res) {
  User.findOne({ _id: req.params.id }).
    then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
}

function createUser(req, res) {
  User.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

function deleteUser(req, res) {
  User.deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
}