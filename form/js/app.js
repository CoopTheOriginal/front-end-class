$(document).foundation()

$("form").on('submit',function(event){
  event.preventDefault();

  var nameValue = $('input[name="name-field"]').val();
  var speedValue = $('input[name="swallow"]:checked').val();
  var questValue = $('#quest').val();
  var colorCheck = $('input[name="color-field"]:checked').length > 0;

  if (nameValue === 'King Arthur' && speedValue == 'european' && colorCheck
      && questValue != null) {
    console.log('IS VALID');
    $(".success").css("display", "block")
    $(".alert").css("display", "none")

  } else {
    console.log("IS NOT VALID");
    $(".alert").css("display", "block")
    $(".success").css("display", "none")
  };
});
