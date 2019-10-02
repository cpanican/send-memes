const http = require('http');
const https = require('https');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: false }));

// Function to get reddit post
function httpsGet(name) {
  return new Promise(((resolve, reject) => {
    var options = {
      host: 'www.reddit.com',
      port: 443,
      path: `/r/${name}/top/.json?sort=top&t=day&limit=1`,
      method: 'GET',
    };

    console.log(options);
    
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';
      
      response.on('data', (chunk) => {
          returnData += chunk;
      });
      
      response.on('end', () => {
          resolve(JSON.parse(returnData));
      });
      
      response.on('error', (error) => {
          reject(error);
      });
    });
    request.end();
  }));
}

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const message = twiml.message();
  if (req.body.Body == 'programmer') {
    message.body('👩‍💻 programmer meme 👨‍💻');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  }
  
  else if (req.body.Body == 'normie') {
    message.body('🙄 normie meme 😒');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  }
  
  else if (req.body.Body == 'dank') {
    message.body('😎 dank meme 👽');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  }
  
  else if (req.body.Body == 'cute') {
    message.body('😍 cute meme 🥺');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
  }
  
  else if (req.body.Body == 'hmmm') {
    const response = httpsGet('showerthoughts');
    console.log("HMMM RESPONSE: ", response);
    const title = response.data.children[0].data.title;
    message.body(
      `🤔 interesting stuff 🧐\n"${title}\n${selftext}"`
    );
  }
  
  else if (req.body.Body == 'joke') {
    async function sequence() {
      const response = await httpsGet('jokes');
      console.log("JOKE RESPONSE: ", response);
      const title = response.data.children[0].data.title;
      const selftext = response.data.children[0].data.selftext;
      message.body(
        `😂 joke of the day 🤣\n"${title}\n${selftext}"`
      );
    }
  }
  
  else {
    message.body(
      '😎 Meme Menu 😎\nTry replying with: programmer, normie, dank, cute, hmmm, or joke'
    );
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(port, () => {
  console.log('Express server listening on port ' + port);
});