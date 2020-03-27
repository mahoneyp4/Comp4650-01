var express = require('express');
var router = express.Router();
var snmp = require('net-snmp');
var session = snmp.createSession("192.168.0.219");
var oids = ["."];

/* GET users listing. */
router.get('/', function(req, res) {

    res.render('snmp');
});


router.post('/', function(req, res){
    //res.send(req.body);\
    ip = req.body.ip;
    subnet= req.body.subnet;
    session.get(oids,function(error, varbinds){
        if (error){
            console.log(error);
        }else{
            for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
            else
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
        }
  
        session.close ();

    });


    data = {
        ip: req.body.ip,
        subnet: req.body.subnet
    }
    res.render('snmp-submit', data);
    
})

module.exports = router;
