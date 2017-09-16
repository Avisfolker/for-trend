const fs = require("fs");
const host = '0.0.0.0';
const port = '9022';
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const path = require('path');
let app = express();
let server = http.createServer(app);
server = app.listen(port, host);
let apiRoutes = express.Router();

apiRoutes.use((req, res, next) => { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apiRoutes.use(bodyParser.json());

app.use('/api', apiRoutes);

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));


apiRoutes.post('/getArrayApartments', (req, res) => {
  let filePath = path.join(__dirname, 'apartments.json');

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      let info = JSON.parse(data);
      info.data.forEach((item) =>{
        if (Math.round(Math.random()) == 1){
          item.booked = 1
        }

      });
      res.send(info);
    } else {
      res.send({success: false, msg: err});
    }
  });

});

apiRoutes.post('/getRewardsForSubagents', (req, res) => {
  let filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      res.send(data);
    } else {
      res.send({success: false, msg: err});
    }
  });

});

server.on('error',  (err) => {
    console.log('error:' + err);
});

server.on('listening', () => {
      console.log('Application ready to serve requests.');
      console.log('server listening on http://'+host+':'+port);
});