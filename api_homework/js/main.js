$(document).ready(function () {

  var makeHtml = function(game_object, num) {
    var template = $('#hidden-template').html();
    var item = $(template).clone();

    $(item).find('#homeTeam').html(game_object.game.homeTeam.City + ' ' + game_object.game.homeTeam.Name);
    $(item).find('#homeTeamScore').html(game_object.homeScore);
    $(item).find('#homeTeamShots').html(game_object.homeShots);

    $(item).find('#awayTeam').html(game_object.game.awayTeam.City + ' ' + game_object.game.awayTeam.Name);
    $(item).find('#awayTeamScore').html(game_object.awayScore);
    $(item).find('#awayTeamShots').html(game_object.awayShots);

    $(item).find('#locationTime').html(game_object.game.location + ' ' + game_object.game.time);

    if (num % 2 == 0) {
      $("#leftColumn").append(item)
    } else {
      $("#rightColumn").append(item)
    }
  }

  var makeApiRequest = function(date) {
    date = date.split('-').join('')
    url = 'https://www.mysportsfeeds.com/api/feed/pull/nhl/2016-regular/scoreboard.json?fordate=' + date

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + btoa("zackjcooper:cheekypassword"),
      },
    }).then(function(data) {
      $(".game").remove()

      data.scoreboard.gameScore.forEach(function (game, num) {
        makeHtml(game, num)
      })

    })
  }

  // Sets default date to 2017 since data only works up until that time period
  $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd"
  }).datepicker("setDate", new Date('2017','01','01'));

  // On page load
  $('#datepicker').datepicker()
    .on("load", makeApiRequest('2017-01-01')
    );

  // On date change
  $('#datepicker').datepicker()
    .on("input change", function (date) {
    makeApiRequest(date.target.value);
  });

});
