import $ from 'jquery';

let updateTime = (time) => {
  $('.time').text(time);
};

let updateStat = (statName) => {
  let element = $('.' + statName)
  let oldValue = Number(element.text())
  element.text(oldValue + 1);
};

export { updateTime, updateStat }
