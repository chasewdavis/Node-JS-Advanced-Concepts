const cluster = require('cluster');
const express = require('express');
const app = express();

if (cluster.isMaster) {

    // forks can run on same port and allow for multiple threads of our event loop!
    for(let i = 0; i < 100; i++){
        // this is NOT performent
        cluster.fork();
        // in terminal run:
            // ab -c 50 -n 500 localhost:3000/fast
    }
    

    // master can NOT run on same port 
    // app.listen(3000); * WILL THROW ERROR EADDRINUSE null:3000 *
} else {
    
    function doWork(duration) {
        const start = Date.now();
        while(Date.now() - start < duration) {};
    }
    
    app.get('/', (req,res) => {
        doWork(10000); 
        // because event loop is single threaded,
        // doWork will delay everything else for ~ 5 seconds
        // node server can do absolutely nothing ( including handle other incomming requests )
        // during this time
        res.send('slow');
    })

    app.get('/fast', (req,res) => {
        res.send('fast');
    })
    
    app.listen(3000);

}
