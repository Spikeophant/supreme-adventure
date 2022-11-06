const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { formattedDate } = require('../utils/helpers');

const thoughtSchema = new Schema(
  {
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formattedDate,
  },
  username: {
    type: String,
    required: true,
    ref: 'User',
  },
  reactions: [
    reactionSchema
  ]
  }
);

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;