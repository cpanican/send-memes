const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const data = require('./getData.js');

const app = express();

var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const message = twiml.message();
  if (req.body.Body == 'programmer') {
    data.getData('programmerhumor', 1).then(fetched => {
      const is_self = fetched[0].data.is_self;
      const title = fetched[0].data.title;
      if (!is_self) {
        const src = fetched[0].data.url;
        message.body(`👩‍💻 programmer meme 👨‍💻\n"${title}"`);
        message.media(src);
      } else {
        const selftext = fetched[0].data.selftext;
        message.body(`👩‍💻 programmer meme 👨‍💻\n"${title}"\n${selftext}`);
      }
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (req.body.Body == 'normie') {
    data.getData('memes', 1).then(fetched => {
      const title = fetched[0].data.title;
      const src = fetched[0].data.url;
      message.body(`🙄 normie meme 😒\n"${title}"`);
      message.media(src);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (req.body.Body == 'dank') {
    data.getData('dankmemes', 1).then(fetched => {
      const title = fetched[0].data.title;
      const src = fetched[0].data.url;
      message.body(`😎 dank meme 👽\n"${title}"`);
      message.media(src);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (req.body.Body == 'cute') {
    message.body('😍 cute meme 🥺');
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
  
  else if (req.body.Body == 'hmmm') {
    data.getData('showerthoughts', 1).then(fetched => {
      const title = fetched[0].data.title;
      message.body(`🤔 interesting stuff 🧐\n"${title}"`);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (req.body.Body == 'joke') {
    data.getData('jokes', 1).then(fetched => {
      const title = fetched[0].data.title;
      const selftext = fetched[0].data.selftext;
      message.body(`😂 joke of the day 🤣\n"${title}"\n${selftext}`);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else {
    message.body(
      '😎 Meme Menu 😎\nTry replying with: programmer, normie, dank, cute, hmmm, or joke'
    );
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
});

http.createServer(app).listen(port, () => {
  console.log('Express server listening on port ' + port);
});