var data = require('./getData.js');

// data.getData('showerthoughts', 1).then(res => {
//   const title = res[0].data.title;
//   console.log(
//     `🤔 interesting stuff 🧐\n"${title}"`
//   );
// });

data.getData('jokes', 3).then(res => {
  res.some(function(arr) {
    if (arr.data.over_18) {
      console.log("over_18:", arr.data.over_18);
    } else {
      const title = arr.data.title;
      const selftext = arr.data.selftext;
      console.log(
        `😂 joke of the day 🤣\n"${title}"\n${selftext}`
      );
      return true;
    }
  })
});

// data.getData('programmerhumor', 1).then(fetched => {
//   const is_self = fetched[0].data.is_self;
//   const title = fetched[0].data.title;
//   const src = fetched[0].data.url;
//   if (!is_self) {
//     console.log(`👩‍💻 programmer meme 👨‍💻\n"${title}"`);
//     console.log("src", src)
//   } else {
//     console.log(`👩‍💻 programmer meme 👨‍💻\n"${title}"\n${selftext}`);
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

// data.getData('aww', 1).then(fetched => {
//   const is_video = fetched[0].data.is_video;
//   const title = fetched[0].data.title;
//   if (is_video) {
//     const thumbnail = fetched[0].data.thumbnail;
//     const url = fetched[0].data.url;
//     console.log(`😍 cute video 🥺\n"${title}"\nWatch full vid: ${url}`);
//     console.log("src", thumbnail);
//   } else {
//     const src = fetched[0].data.url;
//     console.log(`😍 cute meme 🥺\n"${title}"`);
//     console.log("src", src);
//   }
// });