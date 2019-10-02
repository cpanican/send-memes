var data = require('./getData.js');

// data.getData('showerthoughts', 1).then(res => {
//   const title = res[0].data.title;
//   console.log(
//     `🤔 interesting stuff 🧐\n"${title}"`
//   );
// });

// data.getData('jokes', 1).then(res => {
//   const title = res[0].data.title;
//   const selftext = res[0].data.selftext;
//   console.log(
//     `😂 joke of the day 🤣\n"${title}\n${selftext}"`
//   );
// });

// data.getData('programmerhumor', 1).then(fetched => {
//   const is_self = fetched[0].data.is_self;
//   const title = fetched[0].data.title;
//   const src = fetched[0].data.url;
//   if (!is_self) {
//     console.log(`'👩‍💻 programmer meme 👨‍💻'\n"${title}"`);
//     console.log("src", src)
//   } else {
//     console.log(`'👩‍💻 programmer meme 👨‍💻'\n"${title}"\n${selftext}`);
//   }
// });

// data.getData('memes', 1).then(fetched => {
//   const title = fetched[0].data.title;
//   const src = fetched[0].data.url;
//   console.log(`🙄 normie meme 😒\n"${title}"`);
//   console.log("src", src);
// });

// data.getData('dankmemes', 1).then(fetched => {
//   const title = fetched[0].data.title;
//   const src = fetched[0].data.url;
//   console.log(`😎 dank meme 👽\n"${title}"`);
//   console.log("src", src);
// });
