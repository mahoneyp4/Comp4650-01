var nmap = require('node-nmap');
var fs = require('fs');
var express = require('express');
var router = express.Router();

//nmap.nodenmap.nmapLocation = "nmap";
//let quickscan = new nmap.QuickScan('127.0.0.1 google.com');

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
function updateConfig(ent){
    let data = JSON.stringify(ent);
    fs.writeFile('./config.json', data, (err) => {
        if (err) throw err;
        console.log('Config Updated');
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(quickscan);
});

module.exports = router;
