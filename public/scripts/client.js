/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Prevents XSS attack
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//takes in an array of tweet objects and then prepends each one to the #tweets-container
const renderTweets = function(tweets) {
  $('section.tweeter-feed').empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('section.tweeter-feed').prepend($tweet);
  }
};

//takes in tweet object, returns <article> element with HTML structure of tweet
const createTweetElement = (tweet) => {
  const $tweet = $("<article>").addClass("tweet");

  //build tweet dynamically
  const tweetBox = `
    <header class="user">
      <div>
        <img src=${tweet.user.avatars}></i>
        ${tweet.user.name}
      </div>
      <div class="user-handle">${tweet.user.handle}</div>
    </header>
    <div class="tweet-content">
      <p>${escape(tweet.content.text)}</p>
      <div class="line">&nbsp;</div>
    </div>
    <footer class="time-icons">
      <div>${timeago.format(tweet.created_at)}</div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    `;

  $tweet.append(tweetBox);
  return $tweet;
};

const loadTweets = () => {
  $.ajax({ url: '/tweets', method: 'GET'
  }).then((results) => {
    renderTweets(results);
  }).catch((err) => {
    console.log("Error: ", err.message);
  });
};

//loads submitted tweets without refreshing
const tweetSubmitPageRefresh = () => {
  const maxTweetLength = 140;
  $('textarea').val('');
  $('.counter').text(maxTweetLength);
  loadTweets("/tweets", "GET", renderTweets);
};

$(document).ready(function() {
  let maxTweetLength = 140;
  $(".err-msg").hide();

  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    $(".err-msg").slideUp();
    let $form = $(this);

    const newTweetEntered = $form.children('textarea').val();

    if (!newTweetEntered) {
      $('.err-msg').slideDown();
      $('.err-msg strong').text("Please submit a tweet with at least one character.");
      return;
    } else if (newTweetEntered.length > maxTweetLength) {
      $('.err-msg').slideDown();
      $('.err-msg strong').text("Tweets must be 140 characters long or shorter.");
      return;
    } else {
      let tweet = $form.serialize();
      $.ajax({ url: "/tweets", method: 'POST', data: tweet });
      tweetSubmitPageRefresh();
    }
  });

  loadTweets();

});
