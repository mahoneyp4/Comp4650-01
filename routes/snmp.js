var express = require('express');
var router = express.Router();
var snmp = require('net-snmp');
var session = snmp.createSession("192.168.0.219");
var oids = [".3.6.1.2.1.1.6.0"];

session.on ("error", function (error) {
    console.log (error.toString ());
    session.close ();
});

session.on ("close", function () {
    console.log ("socket closed");
});

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

    session.get (oids, function (error, varbinds) {
        if (error) {
            console.error (error.toString ());
        } else {
            for (var i = 0; i < varbinds.length; i++) {
               console.log (varbinds[i].oid + "|" + varbinds[i].value);
                if (snmp.isVarbindError (varbinds[i]))
                    console.error (snmp.varbindError (varbinds[i]));
                else
                    console.log (varbinds[i].oid + "|" + varbinds[i].value);
            }
        }
    });
    



    data = {
        ip: req.body.ip,
        subnet: req.body.subnet
    }
    res.render('snmp-submit', data);
    
})

module.exports = router;
