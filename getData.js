const https = require('https');

// Fetch 24hr top reddit posts from specified subreddit
function httpsRequest(name, limit) {
  return new Promise(((resolve, reject) => {
    var options = {
      host: 'www.reddit.com',
      port: 443,
      path: `/r/${name}/top/.json?sort=top&t=day&limit=${limit}`,
      method: 'GET',
    };
    const request = https.request(options, (response) => {
      console.log('STATUS: ' + response.statusCode);
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
          returnData += chunk;
      });
      
      response.on('end', () => {
          resolve(JSON.parse(returnData).data.children);
      });
      
      response.on('error', (error) => {
          reject(error);
      });
    });
    request.end();
  }));
}

// Export getData
// name: String
// limit: integer
module.exports = {
  getData: async function (name, limit) {
    return await httpsRequest(name, limit);
  },
}