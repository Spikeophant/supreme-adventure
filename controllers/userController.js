const { Thought, User } = require('../model');

function getUsers(req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
}

function getUser(req, res) {
  User.findOne({ _id: req.params.id })
    .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
}

function createUser(req, res) {
  User.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

function updateUser(req, res) {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

function deleteUser(req, res) {
  let resArr = [];
  User.findOne({ _id: req.params.id })
    .then((usrObj) => Thought.deleteMany({username: usrObj.username})
    .then((deadThoughts) =>
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      resArr.push(data, deadThoughts);
      res.json(resArr) })
    .catch((err) => res.status(500).json(err))
    )
    );

}

function addFriend(req, res) {
  User.updateOne( { _id: req.params.id }, friends.push(req.params.fId))
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

function delFriend(req, res) {
  User.updateOne({ _id: req.params.id }, friends.pop(req.params.fId))
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
}

module.exports = {getUsers,getUser,createUser,deleteUser,updateUser,addFriend,delFriend}