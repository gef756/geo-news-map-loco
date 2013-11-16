var map;
var hasInit = false;
var markers;

function initialize(hasInit) {
	if (!hasInit) {
		var mapOptions = {
		  center: new google.maps.LatLng(40.714623,-74.006605 ),
		  zoom: 12,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);
		};

		hasInit = true;
	};
        initMarkers();
}

function initMarkers() {
	var myLatlng = new google.maps.LatLng(40.714623,-74.006605);
	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: 'Hello World!'
	});
}
google.maps.event.addDomListener(window, 'load', initialize(hasInit));
