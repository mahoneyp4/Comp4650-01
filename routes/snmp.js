var express = require('express');
var router = express.Router();
var snmp = require('net-snmp');
var session = snmp.createSession("192.168.0.219");
var oids = [".1.3.6.1.4.1.2021.4.5.0"];

/* GET users listing. */
router.get('/', function(req, res) {

    res.render('snmp');
});


router.post('/', function(req, res){
    //res.send(req.body);\
    ip = req.body.ip;
    subnet= req.body.subnet;
 
    console.log("Fetching OID or something")
    console.log(session.get(oids))


    data = {
        ip: req.body.ip,
        subnet: req.body.subnet
    }
    res.render('snmp-submit', data);
    
})

module.exports = router;
