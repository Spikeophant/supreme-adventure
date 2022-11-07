const express = require('express');
const routes = require('./routes');
const mongo = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(routes);

mongo.once('open', () => {
  app.listen(PORT, () => {
    console.log('Your Supreme Adventure begins now, it is only as vast as your thoughts.');
  });
});