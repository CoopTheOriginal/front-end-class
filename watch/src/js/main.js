var $ = require("jquery");

$(document).ready(function () {

  var makeApiRequest = function() {
    var date = new Date()
    url = 'http://history.muffinlabs.com/date/' + date.getMonth() + '/' + date.getDate();

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      headers: {},
      success: function(data) {
        $(".found").remove();
        displayFacts(data.data.Births, 'births')
        displayFacts(data.data.Events, 'events')
        displayFacts(data.data.Deaths, 'deaths')
      },
      error: function() {
        alert('An error occured')
      }
    })
  }

  var buildHtml = function(text, year) {
    return `<li class="found">Year: ${year} - ${text}</li>`
  }

  var displayFacts = function(data, className) {
    listLength = data.length;

    for( var i = 0; i < 3; i++){
      factNumber = Math.floor(Math.random() * listLength) + 0

      $("." + className).append(
        buildHtml(data[factNumber].text, data[factNumber].year)
      );
    };
  }

  function displayDate() {
    date = new Date
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var finalDate = monthNames[monthIndex] + ' ' + day + ', ' + year;
    $('.splash-subhead').text(finalDate);
  }

  function displayTime() {
    var today = new Date();
    minutes = checkTime(today.getMinutes());
    $('#time').text(`${today.getHours()}:${minutes}`)
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


  $('#refresh').on("click", function (data) {
    makeApiRequest();
    displayDate();
    displayTime();
  });

  $('#refresh').on("load", makeApiRequest());

  $('.splash-subhead').on("load", displayDate());

  $('#time').on("load", displayTime());

});
