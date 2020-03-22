var express = require('express');
var router = express.Router();
var snmp = require ("net-snmp");
//Static Example:
var sessionStatic = snmp.createSession("10.0.17.8", "public");
var bulkStatic = sessionStatic.getBulk(".1.3.6.1");
//

//Dynamic Example: I used a config.json's IP address as an example but you can set it up to store a value the end user enters instead
function captureSNMP(VarIP, VarOID){
    var sessionDynanic = snmp.createSession(VarIP, "public");
    var bulkDynamic = sessionDynanic.getBulk(VarOID);
    return bulkDynamic;
};
//

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Forward bulkStatic to EJS.
    //Still trying to iron out the best way to send the variable over to update the HTML

    //Forward bulkDynamic to EJS. Req.body.VarIP & req.body.VarOID would be the text field were the end user would enter in an IP and OID
    var bulkDynamic = captureSNMP(req.body.VarIP, req.body.VarOID);
    //Still trying to iron out the best way to send the variable over to update the HTML
    res.send('SNMP');
});

module.exports = router;
