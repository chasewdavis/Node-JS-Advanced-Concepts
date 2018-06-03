const https = require('https');

const start = Date.now();

function doRequest(){
    https.request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log(Date.now() - start);
        })
    }).end();
}

// in this scenario, the os is making the http requests, 
// has nothing to do with the thread pool
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
