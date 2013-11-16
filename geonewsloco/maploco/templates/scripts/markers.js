var markers;

function init() {
	var myLatlng = new google.maps.LatLng(40.714623,-74.006605);
	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: 'Hello World!'
	});
}