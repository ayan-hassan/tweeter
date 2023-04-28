$(document).ready(function() {
  //hide button on page load
  $('#scroll-up').hide();
  //when user scrolls down, scroll up button should appear, then disappear when at the top
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 90) {
      $('#scroll-up').show();
      $('#navbar').hide();
    } else {
      $('#scroll-up').hide();
      $('#navbar').show();
    }
  });
  // when clicked, page scrolls to top
  $('#scroll-up').on('click', function() {
    $(window).scrollTo($('#scrollhere'), 600);
    $('textarea').focus();
  });
});
