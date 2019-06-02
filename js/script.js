/*
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity( '.main-carousel', {
  // options
});
*/

//'use strict';

var flkty = new Flickity( '.main-carousel', {
	pageDots: false,
	hash: true
});

document.querySelector('.js--reset').addEventListener('click', function() {
	flkty.select(0)
})

flkty.on( 'scroll.flickity', function( event, progress) {
	progress = Math.max( 0, Math.min( 1, progress ) );
	document.querySelector('progress-bar .bar').style.width = progress * 100 + '%';
});

document.querySelector('.progress-bar .bar').style.width = (flkty.selectedIndex / (flkty.slides.length - 1) * 100 + '%');
/*
(function(){ 
    */
    
	/* W kodzie HTML tego przykładu  dodaliśmy też dwa szablony: 
	- template-product-list, który jest wrapperem listy produktów, oraz
	- template-product-item, który jest szablonem pojedynczej pozycji na liście. 
	
	Oprócz tego dodaliśmy też tablicę, zapisaną w zmiennej productsData, zawierającą kilka obiektów. Każdy z nich reprezentuje jeden produkt, który ma podaną nazwę oraz cenę. 
	
	Zaczniemy od stworzenia zmiennych z kodem naszych szablonów
	*/
	/*
	var templateList = document.getElementById('template-product-list').innerHTML;
	var templateItem = document.getElementById('template-product-item').innerHTML;
	*/
	// Następnie zoptymalizujemy drugą z nich, ponieważ tylko ona będzie wykonywana wielokrotnie. 	
/*
	Mustache.parse(templateItem);
	*/
	// Teraz stworzymy zmienną, w której chcemy mieć kod HTML wszystkich produktów. 
/*
	var listItems = '';
	*/
	/* Czas napisać pętlę, która dla każdego elementu z listy:
	1. wygeneruje kod HTML dla danego produktu, oraz
	2. doda ten wygenrowany kod HTML do zmiennej listItems. 
	
	Uwaga - zmienna productsData, której używamy poniżej, została zdefiniowana w kodzie HTML!
	*/
	/*
	for(var i = 0; i < productsData.length; i++){
		console.log(productsData);
		listItems += Mustache.render(templateItem, productsData[i]);
	}
	*/
	// Po wykonaniu pętli, zmienna listItems zawiera już kod HTML dla wszystkich produktów. Teraz wykorzystamy szablon templateList, aby wstawić produkty do wrappera listy. 
	/*
	var fullProductList = Mustache.render(templateList, {products: listItems});
	*/
	// I w pełni wyrenderowaną listę wyświetlimy na stronie: 
	/*
	results.insertAdjacentHTML('beforeend', fullProductList);
	
})(); 
*/


(function(){ 
	// Definiujemy funkcję initMap tak samo jak wcześniej. 
	
  	window.initMap = function() {
		var uluru = {lat: -25.363, lng: 131.044};
		var sydney = {lat: -33.874237, lng: 151.198517};
		
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 7,
			center: uluru
		});
		
		var markerOne = new google.maps.Marker({
			position: uluru,
			map: map
		});
		
		var markerTwo = new google.maps.Marker({
			position: sydney,
			map: map
		});
		
		// Następnie dodajemy akcję do guzika, dokładnie tak samo jak robiliśmy to w poprzednim module.
		
		document.getElementById('center-map').addEventListener('click', function(event){
			event.preventDefault();
			// Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
			map.panTo(sydney);
			
			// A następnie zmieniamy powiększenie mapy:
			map.setZoom(10);
		});
		
		/* Jak widzisz, guzik "Center map" nagle przeskakuje do docelowych pozycji i powiększenia. 
		
		Jako alternatywę przygotowaliśmy funkcję smoothPanAndZoom, która korzysta z funkcji smoothZoom i smoothPan. Jest to nasz własny kod, który jest przykładem tego w jaki sposób można wykorzystać JavaScript oraz podstawy matematyki do wykonania ciekawych manipulacji. 
		
		Aby zobaczyć ten efekt w akcji, kliknij najpierw guzik "Center map", a następnie "Center smoothly". 
		*/
		
		document.getElementById('center-smooth').addEventListener('click', function(event){
			event.preventDefault();
			smoothPanAndZoom(map, 7, uluru);
		});
	}	
	
	/* Efekt przejścia, który zaimplementowaliśmy za pomocą funkcji smoothPanAndZoom na pewno nie jest idealny, ponieważ staraliśmy się użyć dość prostego algorytmu. 
	
	ĆWICZENIE:
	Poświęć 15 minut na próbę zrozumienia algorytmu działania funkcji smoothPanAndZoom. Nie zatrzymuj się na jednej linii na dłużej niż 3 minuty - jeśli nie rozumiesz, idź dalej i spróbuj zrozumieć resztę kodu. 
	
	Nie bój się używać console.log lub document.write do sprawdzania wartości zmiennych!
	
	Algorytm tych funkcji trudny do zrozumienia, szczególnie w trzecim tygodniu nauki JavaScript. Nie przejmuj się, jeśli go nie zrozumiesz, Zawsze możesz wrócić do tego przykładu za kilka tygodni. ;)
	*/

	var smoothPanAndZoom = function(map, zoom, coords){
		// Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
		var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
		jumpZoom = Math.min(jumpZoom, zoom -1);
		jumpZoom = Math.max(jumpZoom, 3);

		// Zaczynamy od oddalenia mapy do wyliczonego powiększenia. 
		smoothZoom(map, jumpZoom, function(){
			// Następnie przesuwamy mapę do żądanych współrzędnych.
			smoothPan(map, coords, function(){
				// Na końcu powiększamy mapę do żądanego powiększenia. 
				smoothZoom(map, zoom); 
			});
		});
	};
	
	var smoothZoom = function(map, zoom, callback) {
		var startingZoom = map.getZoom();
		var steps = Math.abs(startingZoom - zoom);
		
		// Jeśli steps == 0, czyli startingZoom == zoom
		if(!steps) {
			// Jeśli podano trzeci argument
			if(callback) {
				// Wywołaj funkcję podaną jako trzeci argument.
				callback();
			}
			// Zakończ działanie funkcji
			return;
		}

		// Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
		var stepChange = - (startingZoom - zoom) / steps;

		var i = 0;
		// Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
		var timer = window.setInterval(function(){
			// Jeśli wykonano odpowiednią liczbę kroków
			if(++i >= steps) {
				// Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
				window.clearInterval(timer);
				// Jeśli podano trzeci argument
				if(callback) {
					// Wykonaj funkcję podaną jako trzeci argument
					callback();
				}
			}
			// Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
			map.setZoom(Math.round(startingZoom + stepChange * i));
		}, 80);
	};

	// Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować. 
	var smoothPan = function(map, coords, callback) {
		var mapCenter = map.getCenter();
		coords = new google.maps.LatLng(coords);

		var steps = 12;
		var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

		var i = 0;
		var timer = window.setInterval(function(){
			if(++i >= steps) {
				window.clearInterval(timer);
				if(callback) callback();
			}
			map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
		}, 1000/30);
	}; 
	
})();  


