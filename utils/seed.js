const { User, Thought } = require('../model');
const connection = require('../config/connection');

const { getRandomThought, userData } = require('./dynamicData');

const getUsername = async () => {
  const users = await User.count().exec();
  const userNum = Math.floor(Math.random() * users );
  const user = await User.findOne().skip(userNum).exec();
  return user.username;
}

console.time('Seeding');


connection.once('open', async () => {
  // empty thoughts.
  await Thought.deleteMany({});
  // empty users
  await User.deleteMany({});
  // add some users..
  await User.collection.insertMany(userData());
  await getUsername();
  // here's where it gets complicated,
  // we have users now. so let's make thoughts.
  const makeThoughts = () => {
    let thoughts = [];
    for (let i = 100; i > 0; i--) {
      thoughts.push({
        thoughtText: getRandomThought(),
        username: getUsername(),
        reactions: [
          {
            username: getUsername(),
            reactionBody: getRandomThought(),
          },
          {
            username: getUsername(),
            reactionBody: getRandomThought(),
          }
        ]
      });
    }
    return thoughts;
  }
  await Thought.collection.insertMany(makeThoughts());
  console.log(await User.find({}));
  console.log(await Thought.find({}));
  console.timeEnd('seeding');
  console.log('finished Seeding.')
  process.exit(0)
});