const lorum = [
  'lorem',
  'imsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'curabitur',
  'vel',
  'hendrerit',
  'libero',
  'eleifend',
  'blandit',
  'nunc',
  'ornare',
  'odio',
  'ut',
  'orci',
  'gravida',
  'imperdiet',
  'nullam',
  'purus',
  'lacinia',
  'a',
  'pretium',
  'quis',
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

//returns a random thought or reaction.
const getRandomThought = () => {
  const length = Math.floor(Math.random() * (70 - 5 + 1)) + 5
  let thought = '';
  for (let i = 0; i < length; i++) {
    thought += `${getRandomWord()} `
  }
  return thought.substring(0, 280);
}

//returns array of userdata.
const userData = () => {
  let users = [];
  for (let i = 15; i > 0; i--) {
    users.unshift({username: `username${i}`, email: `${i}@email.com`})
  }
  return users;
}

module.exports = { genRandomIndex, getRandomThought, userData };