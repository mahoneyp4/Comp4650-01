var fs = require('fs');
var isIp = require('is-ip');
var express = require('express');
var router = express.Router();

//Functions:
function updateConfig(ent){
  let data = JSON.stringify(ent);
  fs.writeFile('./config.json', data, (err) => {
    if (err) throw err;
    console.log('Config Updated');
      });
}



//HTTP Calls:
router.post('/', function(req, res, next) {
  var config = req.app.get('config');
  var daship = req.body.daship;
  if(isIp(daship)){
    config.dev.network_ip = daship;
    updateConfig(config);
    console.log("Project Config new IP: "+config.dev.network_ip);
  } else {
    //Insert Warning for it not being an IP address
  }
  res.render('index', { title: 'Home Page' });
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

module.exports = router;
