/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  //takes in an array of tweet objects and then prepends each one to the #tweets-container
  const renderTweets = function(tweets) {
    $('section.tweeter-feed').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('section.tweeter-feed').prepend($tweet);
    }
  };
  
  //takes in tweetObj, returns <article> element with HTML structure of tweet
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
        <p>${tweet.content.text}</p>
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
    let maxTweetLength = 140;
    $('textarea').val('');
    $('.counter').text(maxTweetLength);
    loadTweets("/tweets", "GET", renderTweets);
  };


  //listens for submit event
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    //serializes form data as a query string
    let tweet = $(this).serialize();
    //submits form data POST request to server
    $.ajax({ url: "/tweets", method: 'POST', data: tweet });
    tweetSubmitPageRefresh();
    console.log(tweet);
  });

  loadTweets();
});