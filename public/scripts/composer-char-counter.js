
$(document).ready(function() {
  // --- our code goes here ---
  const newPostField = document.getElementsByClassName('new-tweet')[0].getElementsByTagName('textarea')[0];

  const counter = document.getElementsByClassName('new-tweet')[0].getElementsByTagName('span')[0];

  $(newPostField).on('keyup', function() {
    counter.innerText = 140 - this.value.length;
    if (this.value.length > 140) $('span.counter').addClass('active');
    else $('span.counter').removeClass('active');
  });

  $(newPostField).on('keydown', function() {
    counter.innerText = 140 - this.value.length;
    if (this.value.length > 140) $('span.counter').addClass('active');
    else $('span.counter').removeClass('active');
  });

});