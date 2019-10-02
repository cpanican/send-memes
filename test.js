var data = require('./getData.js');

data.getData('showerthoughts', 1).then(res => {
  const title = res[0].data.title;
  console.log(
    `🤔 interesting stuff 🧐\n"${title}"`
  );
});

data.getData('jokes', 1).then(res => {
  const title = res[0].data.title;
  const selftext = res[0].data.selftext;
  console.log(
    `😂 joke of the day 🤣\n"${title}\n${selftext}"`
  );
});