/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
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
        <div>6 years ago</div>
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

  renderTweets(data);

  //listens for submit event
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    //serializes form data as a query string
    let tweet = $(this).serialize();
    //submits form data POST request to server
    $.ajax({ url: "/tweets", method: 'POST', data: tweet });
    console.log(tweet);
  });
});