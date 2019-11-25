
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// /*Enable CORS*/
// app.use(cors())
// app.enable('trust proxy');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


console.log(path.resolve(__dirname, '../public'));

app.use(express.static('./public'))


router.get('/*', function(request, response, next) {
  //response.sendFile('index.html', {root: './public'});
  response.sendFile(path.resolve(__dirname, '../public')+'/index.html');
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

