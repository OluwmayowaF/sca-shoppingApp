const express = require('express');
const bodyParser = require('body-parser');


const app = express();


const routes = require('./routes');

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content, Accept, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  next();
});

// Setup body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1', routes);

app.listen(`${port}`, () => {
  // eslint-disable-next-line no-console
  console.log(`Server on ${environment}, listening at localhost:${port}`);
});

module.exports = app;
