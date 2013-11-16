var map;
var hasInit = false;
var markers;

/**
 * The load article control will load article markers onto the map
 */

function ArticleControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map.
  controlDiv.style.padding = '5px';

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Load articles when you click the button';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<strong>Load Articles</strong>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  google.maps.event.addDomListener(controlUI, 'click', addMarker);
}


function initialize() {
	if (!hasInit) {
		var mapOptions = {
		  center: new google.maps.LatLng(40.714623,-74.006605 ),
		  zoom: 12,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);

		hasInit = true;
	}
    //addMarker();
    // Create the DIV to hold the control and call the ArticleControl() constructor
	// passing in this DIV.
	var articleControlDiv = document.createElement('div');
	var articleControl = new ArticleControl(articleControlDiv, map);

	articleControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(articleControlDiv);
}

// Adds marker to specfic lat lng
function addMarker(lat, lng) {
    var infowindow = new google.maps.InfoWindow({
        content: "Hello World"
 	});
	var myLatlng = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: 'Hello World!'
	});
        google.maps.event.addListener(marker, 'mouseover', function() {
                  infowindow.open(map,marker);
                });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}

// Passes in lat lng from center of map and returns relevant articles. We then build markers on the map.
function loadArticles() {
  var currentLatLng = getCurrentLatLng();
  var currentRadius = getCurrentRadius();
  //call Gabe's interface to get a bunch of articles

  //loop through relevant articles and get address
    //markerLatLng = geoLocate(address);
    //addmarker(markerLatLng[0], markerLatLng[1]);
}

// Takes String and converts it to lat lng
function geoLocate(address) {

}

google.maps.event.addDomListener(window, 'load', initialize);
