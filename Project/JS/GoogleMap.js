import { data } from './dataImport.js';

// Amount of Latitude and longatute between meters
let LatBetweenMeter = 0.000100;
let LngBetweenMeter = 0.0001000;



function initMap() {
    let location = { lat: 34.879172, lng: -120.142419 };
    let map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 8,
    gestureHandling: "greedy",
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControl: false,
  });
  MarkerMaker(map);
  Grid(map, 3, 5, 35.000900,-120.0009000, 35.000800,-120.0008000);
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

function Rectangle(theMap, TopCornerLat, TopCornerLng, BotCornerLat, BotCornerLng){
  let rectangle = new google.maps.Rectangle({
    map: theMap,
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng (TopCornerLat, TopCornerLng),
      new google.maps.LatLng (BotCornerLat, BotCornerLng)
    )
  });
}

function Grid(theMap, witdh, height, TCLat, TCLng, BCLat, BCLng){

  for(let i = 0; i < witdh; i++){
    Rectangle(theMap, TCLat, TCLng + LngBetweenMeter * i, BCLat, BCLng + LngBetweenMeter * i);
  }
  for(let i = 0; i < height; i++){
    Rectangle(theMap, TCLat - LatBetweenMeter * i,TCLng, BCLat - LatBetweenMeter * i, BCLng);
  }
}

initMap();
