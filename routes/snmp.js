var express = require('express');
var router = express.Router();
var snmp = require('net-snmp');
var session = snmp.createSession("192.168.0.219");
var oids = [".3.6.1.2.1.1.6.0"];

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

    // session.get (oids, function (error, varbinds) {
    //     if (error) {
    //         console.log("errorz")
    //         console.error (error);
    //     } else {
    //         for (var i = 0; i < varbinds.length; i++)
    //             console.log("snmpz")
    //             if (snmp.isVarbindError (varbinds[i]))
    //                 console.error (snmp.varbindError (varbinds[i]))
    //             else
    //                 console.log (varbinds[i].oid + " = " + varbinds[i].value);
    //     }
    //     session.close ();
    // });



    data = {
        ip: req.body.ip,
        subnet: req.body.subnet
    }
    res.render('snmp-submit', data);
    
})

module.exports = router;
