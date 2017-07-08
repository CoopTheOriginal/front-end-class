// import { runTwitter } from './twit';
import { updateTime } from './frontend';

import moment from 'moment';
import $ from 'jquery';


var getLatestTime = () => {
  let time = moment().format('MMMM Do YYYY, h:mm:ss a');
  updateTime(time);
}


$(document).ready(function () {
  setInterval(getLatestTime, 1000);
});
