var nmap = require('node-nmap');
var fs = require('fs');
var isIp = require('is-ip');
var express = require('express');
var router = express.Router();
nmap.nmapLocation = "nmap";


function perfromScan(ipAddr, scanType, customString){
   console.log(ipAddr+" "+scanType+" "+customString)
    var curScan = null;
    var fullNmap = ["-T4", "-A", "-v"];
   // To slow var fullNmap = ["-p 1-65535", "-sS", "-sU", "-T4", "-A", "-v"];
    function actionFunction(data){
            //console.log(data);
            //document.write("Percentage complete" + curScan.percentComplete());
            console.log("Percentage complete" + curScan.percentComplete());
        }
    switch(scanType) {
        case "QuickScan":
            curScan = new nmap.QueuedQuickScan(ipAddr, actionFunction);
            break;
        case "OSPortScan":
            curScan = new nmap.QueuedOsAndPortScan(ipAddr, actionFunction);
            break;
        case "IntenseScan":
            curScan = new nmap.QueuedNmapScan(ipAddr, fullNmap, actionFunction);
            break;
        case "CustomScan":
            var params = customSyntax(customString);
            curScan = new nmap.QueuedNmapScan(ipAddr, params, actionFunction);
            break;
        }
        curScan.on('complete', function(data){
            console.log(data);
            console.log("total scan time" + curScan.scanTime);
            saveJson(curScan.results());
        });

        curScan.on('error', function(error){
            console.log(error);
        });

    curScan.startRunScan();
    return curScan;
}

function customSyntax(customString){
    //break down string
    //regex catch for any bad syntax queries
    //place command parameters in var output

    var output = null;

    return output;
}

function formatOutput(input){
//better look
}

function exportCSV(input){
//finding better way
}

function saveJson(ent){
    let data = JSON.stringify(ent);
    fs.writeFile('./test.json', data, (err) => {
        if (err) throw err;
        console.log('Json Saved');
    });
}

/* POST from users requesting NMAP scans */
router.post('/', function(req, res, next) {
    var ipAddr = req.body.ipAddr;
    var scan = req.body.scan;
    var customParam = req.body.customParam;
    var curScan = perfromScan(ipAddr, scan, customParam)
    console.log(curScan);
    console.log("--------------------------------------");
    console.log(curScan.results());
    curScan.on('complete', function(data){
        console.log(data);
        console.log("total scan time" + curScan.scanTime);
        saveJson(curScan.results());
        res.render('nmap', { data: curScan.results() });
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var empty = {};
    res.render('nmap', { data: empty });
});

module.exports = router;
