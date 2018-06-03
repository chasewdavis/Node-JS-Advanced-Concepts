const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

// Default = 4;
process.env.UV_THREADPOOL_SIZE = 1; 


const start = Date.now();

function doRequest(){
    https.request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log('doRequest:',Date.now() - start);
        })
    }).end();
}

function doHash(){
    crypto.pbkdf2('a','b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
}

// makes use of OS not the threadpool
doRequest();

// takes much longer to run than expected
// makes use of the threadpool
fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
})

// makes use of the threadpool as well!
doHash();
doHash();
doHash();
doHash();