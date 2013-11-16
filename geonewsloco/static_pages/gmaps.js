var map;
function initialize() {
var mapOptions = {
  center: new google.maps.LatLng(40.6700, -73.9400),
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);