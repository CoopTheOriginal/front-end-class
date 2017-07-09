import $ from 'jquery';

let updateTime = (time) => {
  $('.time').text(time);
};

let percentage = (numerator) => {
  var num = (numerator / global.total) * 100
  return Math.round(num)
}

let updateStats = (statName) => {
  let countElement = $('.' + statName + 'Count')
  let newValue = Number(countElement.text()) + 1
  countElement.text(newValue);

  let percentElement = $('.' + statName + 'Percent')
  let percent = percentage(newValue)
  percentElement.text(percent + '%');
};

export { updateTime, updateStats }
