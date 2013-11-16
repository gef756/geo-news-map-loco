var map;
function initialize() {
var mapOptions = {
  center: new google.maps.LatLng(40.714623,-74.006605 ),
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);