/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {
  const promise1 = () => {
    return new Promise((resolve, reject) => {
      $.getJSON('http://localhost:8080/tweets/', (data) => {
        resolve(data);
      });
    });
  };
  // const container = document.getElementById('tweet-feed');
  // const renderTweet = (tweet) => {
  //   appendTweet(tweet);
  // };

  const appendTweet = (tweet, num = 0) => {
    const tweetHTML = `<article>
                        <content>
                          <div id='name'>
                            <img src=${tweet.user.avatars}>
                            <text>${tweet.user.name}</text>
                          </div>
                          <div id='avatar'>
                          </div>
                          <div id='handle'>
                            ${tweet.user.handle}
                          </div>
                          <div id='message'>
                            ${tweet.content.text}
                          </div>
                        </content>
                        <footer>
                          <text>${date(tweet)}</text>
                          <div id='icons'>
                            placeholder
                          </div>
                        </footer>
                      </article>`;
    if (num === 1) {
      $('#tweet-feed').prepend(tweetHTML);
    } else {
      $('#tweet-feed').append(tweetHTML);
    }
  };

  promise1()
    .then((data) => data.forEach(elem => appendTweet(elem)));

  $('.new-tweet').submit(function(event) {
    event.preventDefault();
    let tweet = encodeURI($('.new-tweet textarea').serialize());
    console.log(tweet);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data: tweet,
      success: () => {
        $.get('http://localhost:8080/tweets', (data) => {
          appendTweet(data[0], 1);
        });
      }
    });

  });

  const date = (elem) => {
    let ms = (Date.now() - elem.created_at);
    let plural = '';
    let unit = '';
    let denom = 0;

    //Plural Ternary
    ms >= 0 && ms < 2000 ? plural = '' :
    ms >= 60000 && ms < 120000 ? plural = '' :
    ms >= 3600000 && ms < 7200000 ? plural = '' :
    plural = 's';

    //Unit selection
    ms >= 0 && ms < 60000 ? unit = `second${plural} ago` :
    ms >= 60000 && ms < 3600000 ? unit = `minute${plural} ago` :
    ms >= 3600000 && ms < 86400000 ? unit = `hour${plural} ago` :
    unit = `day${plural} ago`;

    ms >= 0 && ms < 60000 ? denom = 1000 :
    ms >= 60000 && ms < 3600000 ? denom = 60000 :
    ms >= 3600000 && ms < 86400000 ? denom = 3600000 :
    denom = 86400000;

    //case return
    return `${Math.round((Date.now() - elem.created_at) / denom)} ${unit}`;
  };

});




// $(tweet).submit((event) => {
//   event.preventDefault();

// });