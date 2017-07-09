import Twitter from 'twitter';
import { updateStats } from './frontend';

global.total = 0

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let textMatch = (text, matcher, className) => {
  if(text.match(matcher)){ updateStats(className) };
}

const params = {track: 'Trump', lang: 'en'};
let runTwitter = client.stream('statuses/filter', params, (stream) => {
  stream.on('data', (tweet) => {

    if(tweet.text != undefined){
      global.total += 1
      let text = tweet.text.toLowerCase()

      let lookups = {
        'bad': 'fuck|damn|shit|bitch',
        'putin': 'putin',
        'cnn': 'cnn',
        'fox': 'fox',
        'obama': 'obama',
        'fakenews': 'fake news|fakenews',
        'retweet': 'rt @'
      }

      for (var className in lookups) {
        textMatch(text, lookups[className], className);
      };
    }

    if(tweet.user){
      let follow_count = tweet.user.followers_count;
      if(follow_count <= 10){ updateStats('tiny') };
      if(follow_count > 100){ updateStats('some') };
    };
    if(tweet.entities && tweet.entities.urls.length > 0){ updateStats('link') };
    if(tweet.source){ textMatch(tweet.source, 'iphone', 'iphone') };
    if(tweet.source){ textMatch(tweet.source, 'android', 'android') };

  });
  stream.on('error', (error) => {
    console.log('error', error);
  });
});

export { runTwitter }
