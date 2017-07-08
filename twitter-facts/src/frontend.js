import $ from 'jquery';

let updateTime = (time) => {
  $('.time').text(time);

  if($('.mentionsSince').text() == ''){
    $('.mentionsSince').text(' mentions since' + time.split(',')[1])
  }
};

let updateStat = (statName) => {
  let element = $('.' + statName)
  let oldValue = Number(element.text())
  element.text(oldValue + 1);
};

export { updateTime, updateStat }
