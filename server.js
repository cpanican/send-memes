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
  const textInput = req.body.Body.toLowerCase();
  if (textInput == 'programmer') {
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
  
  else if (textInput == 'normie') {
    data.getData('memes', 1).then(fetched => {
      const title = fetched[0].data.title;
      const src = fetched[0].data.url;
      message.body(`🙄 normie meme 😒\n"${title}"`);
      message.media(src);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (textInput == 'dank') {
    data.getData('dankmemes', 1).then(fetched => {
      const title = fetched[0].data.title;
      const src = fetched[0].data.url;
      message.body(`😎 dank meme 👽\n"${title}"`);
      message.media(src);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (textInput == 'cute') {
    data.getData('aww', 1).then(fetched => {
      const is_video = fetched[0].data.is_video;
      const title = fetched[0].data.title;
      if (is_video) {
        const thumbnail = fetched[0].data.thumbnail;
        const url = fetched[0].data.title;
        message.body(`😍 cute video 🥺\n"${title}"\nWatch vid: ${url}`);
        message.media(thumbnail);
      } else {
        const src = fetched[0].data.url;
        message.body(`😍 aww cute 🥺\n"${title}"`);
        message.media(src);
      }
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  
  else if (textInput == 'hmmm' || textInput == 'hmm') {
    data.getData('showerthoughts', 3).then(fetched => {
      fetched.some(function(arr) {
        if (arr.data.over_18) {
          console.log(over_18);
        } else {
          const title = arr.data.title;
          message.body(`🤔 interesting stuff 🧐\n"${title}"`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
          return true;
        }
      })
    });
  }
  
  else if (textInput == 'joke') {
    data.getData('jokes', 3).then(fetched => {
      fetched.some(function(arr) {
        if (arr.data.over_18) {
          console.log("over_18:", true);
        } else {
          const title = arr.data.title;
          const selftext = arr.data.selftext;
          message.body(`😂 joke of the day 🤣\n"${title}"\n${selftext}`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
          return true;
        }
      })
    });
  }

  else if (textInput == 'github') {
    message.body(
      'Check out the code on GitHub! https://github.com/cpanican/send-memes'
    );
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
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