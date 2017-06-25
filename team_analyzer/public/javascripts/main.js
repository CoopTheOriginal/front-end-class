$(function() {

  var getAndSetNarrative = function(selection) {
    $.ajax({
      url: '/api/narrative/' + selection,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((resp) => {
      setNarrative(resp.resp)
    }).catch((err) => {
      console.log(err);
    })
  }

  var setNarrative = function(narrative) {
    $('.narrative').text(narrative)
  }

  $('#team').change(function() {
    const selected = $('#team :selected').val()
    getAndSetNarrative(selected)
  })

})
