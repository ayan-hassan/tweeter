//toggles tweet form as visible or not depending status

$(document).ready(function() {
  $('#button').on('click', function() {
    if ($('#tweet-form-box').is(":hidden")) {
      $('#tweet-form-box').slideDown();
      $('textarea').focus();
    } else {
      $('#tweet-form-box').slideUp();
    }
    
  });
});
