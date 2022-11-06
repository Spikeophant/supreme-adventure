const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email addresss.'],
    unique: true,
    match: [/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, 'Please enter a valid email address.']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
},{
  toJson: { virtuals: true }
});

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;