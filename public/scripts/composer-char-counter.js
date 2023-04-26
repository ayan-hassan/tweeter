$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let maxTweetLength = 140;
    let currentLength = $(this).val().length;
    $(".counter").text(maxTweetLength - currentLength);
  });
});