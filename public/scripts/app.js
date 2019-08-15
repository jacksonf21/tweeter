/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {

  const escape = str => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //DECIDED TO APPEND ALL HTML OF TWEETS INTO A SINGLE STRING TO CALL JQUERY ONLY ONCE
  //TAKES AN ARRAY OF TWEET OBJECTS AND GETS RELATIVE VALUES
  const tweetsString = (tweets) => {
    let tweetsStr = '';
    if (!Array.isArray(tweets)) tweets = [tweets];

    tweets.forEach(tweet => {
      tweetsStr += `<article>
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
              ${escape(tweet.content.text)}
            </div>
          </content>
          <footer>
            <text>${date(tweet)}</text>
            <div id='icons'>
              <img src='images/like.svg' width='25px' height='25px'>
              <img src='images/share.svg' width='25px' height='25px'>
              <img src='images/flag.svg' width='20px' height='25px'>
            </div>
          </footer>
        </article>`;
    });
    return tweetsStr;
  };

  const appendTweet = (tweet) => {
    $('#tweet-feed').append(tweet);
  };

  const prependTweet = (tweet) => {
    $('#tweet-feed').prepend(tweet);
  };
  
  //INTIALIZE DB TWEETS
  const promise1 = () => {
    return new Promise((resolve, reject) => {
      $.getJSON('/tweets', (data) => {
        resolve(data);
      });
    });
  };

  promise1()
    .then((data) => appendTweet(tweetsString(data)));

  //AJAX POST AND GET REQUEST SUBSEQUENTLY ON NEW TWEET SUBMIT
  const ajaxGet = () => {
    $.get('/tweets', (data) => {
      prependTweet(tweetsString(data[0]));
    });
  };

  $('.new-tweet').submit(function(event) {
    const input = $('.new-tweet textarea').val();
    event.preventDefault();
    
    if (validInput(input)) {
      $('#errAlert').hide(400);
      $('.counter').text(140);

      let tweet = $('.new-tweet textarea').serialize();
      $('.new-tweet textarea').val('');

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: tweet,
        success: () => ajaxGet()
      });
    } else {
      $('#errAlert').slideDown(400);
    }
  });

  const validInput = (input) => {
    if (input === '' || input === null || input.length > 140) {
      return false;
    } else {
      return true;
    }
  };

  const date = (elem) => {
    let ms = (Date.now() - elem.created_at);
    let plural = '';
    let unit = '';
    let denom = 0;

    ms >= 0 && ms < 2000 ? plural = '' :
    ms >= 60000 && ms < 120000 ? plural = '' :
    ms >= 3600000 && ms < 7200000 ? plural = '' :
    plural = 's';

    ms >= 0 && ms < 60000 ? unit = `second${plural} ago` :
    ms >= 60000 && ms < 3600000 ? unit = `minute${plural} ago` :
    ms >= 3600000 && ms < 86400000 ? unit = `hour${plural} ago` :
    unit = `day${plural} ago`;

    ms >= 0 && ms < 60000 ? denom = 1000 :
    ms >= 60000 && ms < 3600000 ? denom = 60000 :
    ms >= 3600000 && ms < 86400000 ? denom = 3600000 :
    denom = 86400000;

    return `${Math.round((Date.now() - elem.created_at) / denom)} ${unit}`;

  };

  //HEADER NAV CLICK
  $('#target').click(() => {
    $('.new-tweet').slideToggle(400, () => {
      $('.new-tweet textarea').focus();
    });
  });

  //NAV CLICK & BOTTOM RIGHT BUTTON FADE IN AND OUT
  $(window).scroll(() => {
    if ($(document).scrollTop() > 400) {
      $('#button').fadeIn();
      $('#navbox div').fadeOut();

    } else if ($(document).scrollTop() < 400) {
      $('#button').fadeOut();
      $('#navbox div').fadeIn();
      
    }
  });

  //PREVENT TEXTAREA DEFAULT BEHAVIOURS
  $('.new-tweet textarea').keydown((e) => {
    if (e.keyCode === 13 && !e.ShiftKey) {
      e.preventDefault();
    }
    if ($('#errAlert').is(':visible') && (e.keyCode === 8 || e.keyCode === 46)) {
      $('#errAlert').slideUp(400);
    }
  });

});
