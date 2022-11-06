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
  console.log(await getUsername());
  // here's where it gets complicated,
  // we have users now. so let's make thoughts.
  const makeThoughts = async () => {
    let thoughts = [];
    for (let i = 100; i > 0; i--) {
      const username = await getUsername();
      const reactionname = await getUsername();
      thoughts.push({
        thoughtText: getRandomThought(),
        username: username,
        reactions: [
          {
            username: reactionname,
            reactionBody: getRandomThought(),
          },
          {
            username: reactionname,
            reactionBody: getRandomThought(),
          }
        ]
      });
    }
    console.log(thoughts);
    return thoughts;
  }

  await Thought.collection.insertMany(await makeThoughts());
  console.log(await Thought.find({}));
  console.log(await User.find({}));
  console.timeEnd('seeding');
  console.log('finished Seeding.')
  process.exit(0)
});