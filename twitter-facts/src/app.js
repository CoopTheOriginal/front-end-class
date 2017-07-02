import moment from 'moment';
import Twitter from 'twitter';

var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(rightNow);



var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
  console.log(event && event.text);
});

stream.on('error', function(error) {
  throw error;
});

// You can also get the stream in a callback if you prefer.
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
