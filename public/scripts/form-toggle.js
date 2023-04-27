$(document).ready(function() {
  $('#button').on('click', function() {
    //scroll to invisible relative position element above textarea
    $(window).scrollTo($('#scrollhere'), 600);
    $('textarea').focus();
  });
});
