const { Schema, model, Types } = require('mongoose');
const { formattedDate } = require('../utils/helpers');

const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formattedDate,
    }
},{
  toJson: { virtuals: true },
  id: false,
});

module.exports = reactionSchema;