var flkty = new Flickity( '.main-carousel', {
	pageDots: false,
	hash: true
});

document.querySelector('.js--reset').addEventListener('click', function() {
	flkty.select(0)
})

flkty.on( 'scroll', function( progress) {
	progress = Math.max( 0, Math.min( 1, progress ) );
	document.querySelector('progress-bar .bar').style.width = progress * 100 + '%';
});

document.querySelector('.progress-bar .bar').style.width = (flkty.selectedIndex / (flkty.slides.length - 1) * 100 + '%');

