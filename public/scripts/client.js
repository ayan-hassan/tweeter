/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




//takes in tweetObj, returns <article> element with HTML structure of tweet
const createTweetElement = (tweet) => {
  const $tweet = $("<article>").addClass("tweet");

  //build tweet dynamically
  const tweetBox = `
    <header class="user">
      <div>
        <img src="${tweet.user.avatar}"></i>
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




$(document).ready(function() {

});
