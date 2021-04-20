import { data } from './dataImport.js';

function initMap() {
    let location = { lat: -34.397, lng: 150.644 };
    let map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 8,
    gestureHandling: "greedy",
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControl: false,
  });
  MarkerMaker(map);
  Rectangle(map, 35.000900,-120.0009000, 35.000800,-120.0008000);
}

function MarkerMaker(theMap){
  for (let i = 0; i < data.length; i++){
    var myLatlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
    var marker = new google.maps.Marker({
      position: myLatlng,
      title:data[i].Area
  });
  marker.setMap(theMap);
  }
}

function Rectangle(theMap,TopCornerLat,TopCornerLng,BotCornerLat,BotCornerLng){
  let rectangle = new google.maps.Rectangle({
    map: theMap,
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng (TopCornerLat, TopCornerLng),
      new google.maps.LatLng (BotCornerLat, BotCornerLng)
    )
  });
}

initMap();
