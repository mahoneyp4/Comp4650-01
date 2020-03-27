var nmap = require('node-nmap');
var fs = require('fs');
var isIp = require('is-ip');
var express = require('express');
var router = express.Router();

nmap.nmapLocation = "nmap";
//Functions
/**
 *
 * Use check boxes to setup the scans || Will prevent stupid bugs & issues
 *
 * TypeScan:
 *  -> Input: IP range, Scan Type
 *
 * Custom Scan Check for Bad Strings
 *  -> Ensure no 'super' scans occur
 *  -> Regex to stop bad ranges
 *  -> Stop Scans outside of the network ???
 *
 *  CustomScan:
 *  -> Input: Custom Scan
 *
 *  Formating:
 *  -> Make stuff readable
 *
 */


function perfromScan(ipAddr, subnet, scanType, customString){
    var curScan = null;
    if(subnet){
        var range = ipAddr+"/"+subnet;
    }else{
        var range = ipAddr;
    }
    var fullNmap = ["-p 1-65535", "-sS", "-sU", "-T4", "-A", "-v"];
    function actionFunction(data){
            //console.log(data);
            //document.write("Percentage complete" + curScan.percentComplete());
            console.log("Percentage complete" + curScan.percentComplete());
        }
    switch(scanType) {
        case "QuickScan":
            curScan = new nmap.QueuedQuickScan(range, actionFunction);
            break;
        case "OSPortScan":
            curScan = new nmap.QueuedOsAndPortScan(range, actionFunction);
            break;
        case "IntenseScan":
            curScan = new nmap.QueuedNmapScan(range, fullNmap, actionFunction);
            break;
        case "CustomScan":
            var params = customSyntax(customString);
            curScan = new nmap.QueuedNmapScan(range, params, actionFunction);
            break;
        }curScan.on('complete', function(data){
            console.log(data);
            console.log("total scan time" + curScan.scanTime);
            saveJson(curScan);
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
    var subnet = req.body.subnet;
    var scan = req.body.scan;
    var customParam = req.body.customParam;
    var curScan = perfromScan(ipAddr, subnet, scan, customParam)
    console.log(curScan);
    console.log("--------------------------------------");
    console.log(curScan.results());
    res.render('nmap', { title: 'Home Page' });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('nmap', { title: 'Home Page' });
});

module.exports = router;
