var map;
var hasInit = false;
var markersArray = [];

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
	var myLatlng = (JSONObj.lat && JSONObj.lng) ? new google.maps.LatLng(JSONObj.lat, JSONObj.lng) : null;
  if (myLatLng == null) {
    console.log("Lat Lng for article was null. No marker made");
    return;
  }
	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: JSONObj.headline
	});

  markersArray.push(marker);

  var infowindow = new google.maps.InfoWindow({
      content: JSONObj.Blurb;
  });

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });
  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();
  });
  console.log("Plotting headline " + JSONObj.headline + "at " + JSONObj.lat + " " + JSONObj.lng);
}

// Passes in lat lng from center of map and returns relevant articles. We then build markers on the map.
function loadArticles() {
  //clear map markers
  clearMarkers();

  //Get lat lng for center
  var currentLatLng = map.getCenter();
  var lat = currentLatLng.lat();
  var lng = currentLatLng.lng();

  //Get region radius
  var bounds = map.getBounds();
  var swPoint = bounds.getSouthWest();
  var xOffset = Math.abs(swPoint.lng() - lng);
  var yOffset = Math.abs(swPoint.lat() - lat);

  //call Gabe's interface to get a bunch of articles
  var JSONArr[] = getFromServer(lat, lng, xOffset, yOffset);

  //loop through relevant articles and get address
  //var JSONObj = gabeFunction(lat, lng, proximitymiles);
  for(var i = 0; i < JSONArr.length; i++) {
    addMarker(JSONArr[i]);
  }
}

function clearMarkers() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
}

function getFromServer(lat, lng, xOffset, yOffset) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    console.log("getting from " + "/maploco/stories?lat=" + lat + "&long=" + lng + "&xoffset=" + xOffset + "&yoffset=" + yOffset);
    xmlHttp.open( "GET", "/maploco/stories?lat=" + lat + "&long=" + lng + "&xoffset=" + xOffset + "&yoffset=" + yOffset, true);
    xmlHttp.send();
    return xmlHttp.responseText;
}

google.maps.event.addDomListener(window, 'load', initialize);
