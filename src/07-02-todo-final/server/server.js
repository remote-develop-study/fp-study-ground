const express = require('express');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const asyncify = require('express-asyncify');
const middleware = require('./middleware');
const cors = require('cors');
const app = asyncify(express());
const router = require('./routes');
const PORT = process.env.PORT || 3000;

app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(useragent.express());
app.use(cors());

app.use((req, res, next) => {
  const browsers = new useragent.UserAgent()._Browsers;
  if (middleware.isValidRequestFromBrowser(req, browsers)) {
    next();
  } else {
    res.status(401);
    res.end();
  }
});

app.use(router);
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log('Listening on port 3000')
});