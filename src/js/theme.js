$(document).ready(function(){
	$('.slider').slider({
		full_width: true,
		indicators: true,
		interval: 4000
	});
  $('.carousel').carousel({
		dist:0,
		shift:40,
		padding:0,
  });
  $('.parallax').parallax();
  $('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});
});