var express = require('express');
var router = express.Router();
var snmp = require("net-snmp");
router.get('/', function(req, res) {

    res.render('snmp');
});


router.post('/', function(req, res){
    if(req.body.default){
        console.log('Default true')
        ip ='192.168.0.219';
        oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];
        session = snmp.createSession(ip, "public");
        var snmpResponse ='';
        session.get(oids, function (error,varbinds){
            
            if (error){
                console.error(error.toString());
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    console.log (varbinds[i].oid + " | " + varbinds[i].value);
                    snmpResponse=snmpResponse.concat(varbinds[i].oid ," | " , varbinds[i].value, "<br/>");
                    console.log('snmpResonse');
                    console.log(snmpResponse);
                    
                    
                     if (snmp.isVarbindError (varbinds[i]))
                         console.error (snmp.varbindError (varbinds[i]));
                 }
                 data = {
                    resIp: ip,
                    resSubnet: req.body.subnet,
                    resSnmpResponse: snmpResponse
                }
                res.render('snmpSubmit', data);
                
            }
            session.close();
        });
        
        
    }else{
        console.log('Default false')
        ip = req.body.ip;
        if(ip=='')ip='192.168.0.219'
        console.log(req.body);
        oids=req.body.oid;
        console.log("oids before split");
        
        if(req.body.host)
            if(oids=='')oids='1.3.6.1.2.1.1.5.0'; else oids=oids.concat(',','1.3.6.1.2.1.1.5.0');
            
        //////////////////////////////////////////
        console.log(oids);
        oids=oids.split(',');
        console.log('aftersplit')
        console.log(oids);
        console.log(typeof(oids));
        session = snmp.createSession(ip,"public");
        var snmpResponse ='';
        session.get(oids, function (error,varbinds){
            
            if (error){
                console.error(error.toString());
                console.log('ERROR OCURRED OVER HERe')
                res.render('snmpError');
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    console.log (varbinds[i].oid + " | " + varbinds[i].value);
                    snmpResponse=snmpResponse.concat(varbinds[i].oid ," | " , varbinds[i].value, "<br/>");
                    console.log('snmpResonse');
                    console.log(snmpResponse);
                    
                    
                     if (snmp.isVarbindError (varbinds[i]))
                         console.error (snmp.varbindError (varbinds[i]));
                 }
                 data = {
                    resIp: ip,
                    resSubnet: req.body.subnet,
                    resSnmpResponse: snmpResponse
                }
                res.render('snmpSubmit', data);
                
            }
            session.close();
        });
    }
 
})


module.exports = router;
