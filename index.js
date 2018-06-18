process.env.UV_THREADPOOL_SIZE = 1; // every child only has 1 thread

const cluster = require('cluster');

if (cluster.isMaster) {
    
    // forks can run on same port and allow for multiple threads of our event loop!
    // for(let i = 0; i < 100; i++){
        // this is NOT performent
        // cluster.fork(); // every child has it's own seperate threadpool
        // in terminal run:
        // ab -c 50 -n 500 localhost:3000/fast
        // }
        
        // best to match number of clusters with number of physical CPU cores running on machine
        cluster.fork();
        cluster.fork();
        
        
        // master can NOT run on same port 
        // app.listen(3000); * WILL THROW ERROR EADDRINUSE null:3000 *
    } else {
        const crypto = require('crypto');
        const express = require('express');
        const app = express();
        
        app.get('/', (req,res) => {
        crypto.pbkdf2('a','b', 100000, 512, 'sha512', () => {
            res.send('slow');
        });
    })

    app.get('/fast', (req,res) => {
        res.send('fast');
    })
    
    app.listen(3000);

}
