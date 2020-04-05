var express = require('express');
var router = express.Router();
var snmp = require("net-snmp");
//var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];
// session.on ("error", function (error) {
//     console.log (error.toString ());
//     session.close ();
// });
// session.on ("close", function () {
//     console.log ("socket closed");
// });

/* GET users listing. */
router.get('/', function(req, res) {

    res.render('newSnmp');
});


router.post('/', function(req, res){
    //res.send(req.body);
    // ip = req.body.ip;
    // console.log(typeof(ip))
    // subnet= req.body.subnet;

    //Check if the Uses defaults checkbox is checked.  If it is, override the IP and OID
    if(req.body.default){
        console.log('Default true')
        ip ='192.168.0.219';
        oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];
        session = snmp.createSession(ip, "public");
        console.log(oids)
        session.get (oids, function (error, varbinds) {
            if (error) {
                console.error (error.toString ());
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                   console.log (varbinds[i].oid + "|" + varbinds[i].value);
                    if (snmp.isVarbindError (varbinds[i]))
                        console.error (snmp.varbindError (varbinds[i]));
                }
            }
            session.close();
        });
    }else{
        console.log('Default false')
        ip = req.body.ip;
        oids=req.body.oid;
        oids=oids.split(',');
        console.log(oids[0]);
        console.log(oids[1]);
        console.log(oids[2]);
        console.log(typeof(oids));
        session = snmp.createSession(ip,"public");

        session.get(oids, function (error,varbinds){
            if (error){
                console.error(error.toString());
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    console.log (varbinds[i].oid + "|" + varbinds[i].value);
                     if (snmp.isVarbindError (varbinds[i]))
                         console.error (snmp.varbindError (varbinds[i]));
                 }
                
            }
            session.close();
        });
    }
    //creating session
    

    


    



    data = {
        ip: req.body.ip,
        subnet: req.body.subnet
    }
    res.render('newSnmp-submit', data);
    
})

module.exports = router;
