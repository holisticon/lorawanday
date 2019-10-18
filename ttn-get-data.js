
const express = require('express')
const https = require('https');
const cors = require('cors');
const app = express()

console.log("Started DHT22 Demo LoraWAN reading Server. listening on :3000")


app.use(cors());
app.get('/data', function (req, res) {

  https.get({
    hostname: '<your hostname>',
    port: 443,
    path: '/api/v2/query',
    headers: {
      Accept: 'application/json',
      Authorization: 'key <your-key-here>' // put app key
    }
  }, (resp) => {

    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      // console.log(JSON.parse(data).explanation);
      res.send(JSON.parse(data));
    });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      res.send(err);
    }
  );

});

app.listen(3000)
