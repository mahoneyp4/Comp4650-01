var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res) {

    res.render('snmp');
});


router.post('/', function(req, res){
    //res.send(req.body);\
    ip = req.body.ip;
    subnet= req.body.subnet;
    

    data = {
        ip: req.body.ip,
        subnet: req.body.subnet
    }
    res.render('snmp-submit', data);
    
})

module.exports = router;
