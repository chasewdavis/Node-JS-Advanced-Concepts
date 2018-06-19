const crypto = require('crypto');
const express = require('express');
const app = express();
const { Worker } = require('webworker-threads')        

// ---------------------------
// CLUSTER MODE IS MORE STABLE
// USE WORKER THREADS WITH CAUTION
// ---------------------------

app.get('/', (req,res) => {

    // inside worker
    const worker = new Worker(function() {
        this.onmessage = function() {
            let counter = 0;
            while(counter < 1e9) {
                counter++;
            }

            postMessage(counter);
        }
    });

    //inside app
    worker.onmessage = function(message) {
        console.log(message.data);
        res.send(`${message.data}`);
    }
    worker.postMessage()

})

app.get('/fast', (req,res) => {
    res.send('fast');
})

app.listen(3000);
