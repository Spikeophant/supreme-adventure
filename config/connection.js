const { connect, connection } = require('mongoose');

connect('mongodb://localhost/supreme-adventure', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports= connection;