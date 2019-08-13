/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=> {
  let data;
  const promise1 = () => {
    return new Promise((resolve, reject) => {
      $.getJSON('http://localhost:8080/tweets/', (data) => {
        resolve(data);
      });
    });
  };
  const container = document.getElementById('tweet-feed');
  
  promise1()
    .then((data) => {
      data.forEach(elem => {
        console.log(elem);
        $(container).append(
          `<article>
            <content>
              <div id='name'>
                <img src=${elem.user.avatars}>
                <text>${elem.user.name}</text>
              </div>
              <div id='avatar'>
              </div>
              <div id='handle'>
                ${elem.user.handle}
              </div>
              <div id='message'>
                ${elem.content.text}
              </div>
            </content>
            <footer>
              <text>${date(elem)}</text>
              <div id='icons'>
                placeholder
              </div>
            </footer>
          </article>`
        );
      });
    });

  const date = (elem) => {
    const plural = 's';
    //Plural
    if ()
    //Not plural

    //case return
    if (Math.round((Date.now() - elem.created_at) / 86400000) === 0) {
      return 'Today';
    }
    return `${Math.round((Date.now() - elem.created_at) / 86400000)} days ago`;
  };

  const 
});