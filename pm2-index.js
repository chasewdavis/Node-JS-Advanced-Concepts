// FROM COMMAND LINE:
// ------------------
// pm2 start index.js -i 0
// ------------------
// In this case pm2 will set up the number of instances based on logical cpu cores
// physical cores * threads per core = logical cores

// FROM COMMAND LINE:
// ------------------
// pm2 delete index
// ------------------
// This will shut down all instances

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
