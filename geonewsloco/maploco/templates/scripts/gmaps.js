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
  google.maps.event.addDomListener(controlUI, 'click', loadArticles);
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
function addMarker(JSONObj) {
    var infowindow = new google.maps.InfoWindow({
        content: JSONObj.Blurb;
 	});
	var myLatlng = new google.maps.LatLng(JSONObj.lat, JSONObj.lng);
	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: JSONObj.headline
	});

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });
  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();
  });

}

// Passes in lat lng from center of map and returns relevant articles. We then build markers on the map.
function loadArticles() {
  //Get lat lng for center
  var currentLatLng = map.getCenter();
  var lat = currentLatLng.lat;
  var lng = currentLatLng.lng;

  //Get region radius
  var bounds = map.getBounds();
  var swPoint = bounds.getSouthWest();
  var proximitymeter = google.maps.geometry.spherical.computeDistanceBetween(swPoint, currentLatLng);
  var proximitymiles = proximitymeter * 0.000621371192;

  //call Gabe's interface to get a bunch of articles

  //loop through relevant articles and get address
  //var JSONObj = gabeFunction(lat, lng, proximitymiles);
  for(var i = 0; i < JSONObj.length; i++) {
    console.log("Plotting headline " + JSONObj[i].headline + "at " + JSONObj[i].lat + " " + JSONObj[i].lng);
    addMarker(JSONObj[i]);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
