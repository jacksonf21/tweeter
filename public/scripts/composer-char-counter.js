
$(document).ready(function() {
  // --- our code goes here ---
  const newPostField = document.getElementsByClassName('new-tweet')[0].getElementsByTagName('textarea')[0];

  const counter = document.getElementsByClassName('new-tweet')[0].getElementsByTagName('span')[0];
  
  $(newPostField).on('input', function() {
    counter.innerText = 140 - this.value.length;
    if (this.value.length > 140) $('span.counter').addClass('active');
    else $('span.counter').removeClass('active');


    // if ($('#errAlert').is(':visible')) {
    //   $('#errAlert').slideUp(400);
    //   console.log('fire');
    // }

    this.style.height = 'auto';
    this.style.height = (Number(this.scrollHeight) + 2) + 'px';
  });


  // $(newPostField).on('keydown', function() {
  //   counter.innerText = 140 - this.value.length;
  //   if (this.value.length > 140) $('span.counter').addClass('active');
  //   else $('span.counter').removeClass('active');
  // });

});