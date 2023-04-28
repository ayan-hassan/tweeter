$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let maxTweetLength = 140;
    let currentLength = $(this).val().length;
    $(".counter").text(maxTweetLength - currentLength);

    //changes counter to red when over tweet limit
    if (currentLength > maxTweetLength) {
      $(".counter").addClass("overTweetLimit");
    } else if (currentLength <= maxTweetLength) {
      $(".counter").removeClass("overTweetLimit");
    }
  });
});