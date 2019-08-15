
$(document).ready(function() {
  const newPostField = document.getElementsByClassName('new-tweet')[0].getElementsByTagName('textarea')[0];
  const counter = document.getElementsByClassName('new-tweet')[0].getElementsByTagName('span')[0];
  
  $(newPostField).on('input', function() {
    counter.innerText = 140 - this.value.length;
    if (this.value.length > 140) $('span.counter').addClass('active');
    else $('span.counter').removeClass('active');

    //ADJUSTS TEXTAREA HEIGHT ON INPUT
    this.style.height = 'auto';
    this.style.height = (Number(this.scrollHeight) + 7) + 'px';
  });


});