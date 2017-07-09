import Twitter from 'twitter';
import { updateStat } from './frontend';

let badCount, putinCount, cnnCount, retweetCount, linkCount,
    tinyCount, totalCount, badPercent, putinPercent, cnnPercent,
    retweetPercent, linkPercent, tinyPercent = 0

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let percentage = (numerator, denominator) => {
    return (numerator / denominator) * 100
}

const params = {track: 'Trump', lang: 'en'};

let runTwitter = client.stream('statuses/filter', params, (stream) => {
  stream.on('data', (tweet) => {

    updateStat('totalCount')

    if(['fuck', 'damn', 'shit', 'bitch'].indexOf(tweet.text.toLowerCase()) >= 0){
      badCount += 1;
      badPercent = percentage(badCount, totalCount);
    };
    if(['putin'].indexOf(tweet.text.toLowerCase()) >= 0){
      putinCount += 1;
      putinPercent = percentage(putinCount, totalCount);
    };
    if(['cnn'].indexOf(tweet.text.toLowerCase()) >= 0){
      cnnCount += 1;
      cnnPercent = percentage(cnnCount, totalCount);
    };
    if('RT @'.indexOf(tweet.text)){
      retweetCount += 1;
      retweetPercent = percentage(retweetCount, totalCount);
    };
    if('http://'.indexOf(tweet.text)){
      linkCount += 1;
      linkPercent = percentage(linkCount, totalCount);
    };
    if(tweet.user && tweet.user.followers_count > 10){
      tinyCount += 1;
      tinyPercent = percentage(tinyCount, totalCount);
    };
  });
  stream.on('error', (error) => {
    console.log('error', error);
  });
});

export { runTwitter }
