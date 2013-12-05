var map;
var request;
var hasInit = false;
var markersArray = [];

google.maps.event.addDomListener(window, 'load', initialize);

//Generate map during initial map load
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
  
  // Create the DIV to hold the control and call the ArticleControl() constructor
  // passing in this DIV.
  var articleControlDiv = document.createElement('div');
  var articleControl = new ArticleControl(articleControlDiv, map);

  articleControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(articleControlDiv);
}

// Creates request based on browser used by user
function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (trymicrosoft) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }
  if (request == null) {
    alert("Error creating XMLHttpRequest. Try switching browsers");
  }
}

/* Called when user clicks on the "Load Articles" button on the map*/
function getFromServer() {
    //Get lat lng for center
    var currentLatLng = map.getCenter();
    var lat = currentLatLng.lat();
    var lng = currentLatLng.lng();

    //Get region radius
    var bounds = map.getBounds();
    var swPoint = bounds.getSouthWest();
    var xOffset = Math.abs(swPoint.lng() - lng);
    var yOffset = Math.abs(swPoint.lat() - lat);

    createRequest();
    var url = "/maploco/stories?lat=" + lat + "&long=" + lng + "&xoffset=" + xOffset + "&yoffset=" + yOffset;
    console.log("getting from " + url);
    request.open("GET", url, true);
    request.onreadystatechange = loadArticles;
    request.send(null);
}

/* Loads articles when server request is ready */
function loadArticles() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        clearMarkers();
        var JSONArr = JSON.parse(request.responseText);
        //loop through relevant articles and get address
        for(var i = 0; i < JSONArr.length; i++) {
          addMarker(JSONArr[i]);
        }
      } else {
        alert("Error! Request status is " + request.status);
      }
    }
}

//The load article control will load article markers onto the map
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
  google.maps.event.addDomListener(controlUI, 'click', getFromServer);
}

// Adds marker to specfic lat lng
function addMarker(JSONObj) {
	var myLatLng = (JSONObj.fields.lat && JSONObj.fields.lon) ? new google.maps.LatLng(JSONObj.fields.lat, JSONObj.fields.lon) : null;
  if (myLatLng == null) {
    console.log("Lat Lng for article was null. No marker made");
    return;
  }
	var marker = new google.maps.Marker({
	  position: myLatLng,
	  map: map,
	  title: JSONObj.headline,
          url: JSONObj.fields.url
	});

  markersArray.push(marker);

  var infowindow = new google.maps.InfoWindow({
      content: JSONObj.fields.blurb
  });

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });
  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();
  });
  google.maps.event.addListener(marker, 'click', function() {
    window.open(this.url);
  });
  console.log("Plotting headline " + JSONObj.fields.headline + "at " + JSONObj.fields.lat + " " + JSONObj.fields.lon);
  console.log("Plotting headline " + JSONObj.headline + "at " + JSONObj.lat + " " + JSONObj.lng);
}


function clearMarkers() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
}
