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
  GenerateAllGrids(map);
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

function Rectangle(theMap, TopCornerLat, TopCornerLng, BotCornerLat, BotCornerLng, randomColor){
  let rectangle = new google.maps.Rectangle({
    map: theMap,
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng (TopCornerLat, TopCornerLng),
      new google.maps.LatLng (BotCornerLat, BotCornerLng)
    ),
    fillColor: randomColor,
    strokeColor: randomColor,
    strokeWeight: 1,
  });
}

function Grid(theMap, witdh, height, TCLat, TCLng, BCLat, BCLng){

  for(let i = 0; i < witdh; i++){
    Rectangle(theMap, TCLat, TCLng + LngBetweenMeter * i, BCLat, BCLng + LngBetweenMeter * i, getRandomColor());
  }
  for(let i = 0; i < witdh; i++){
    for(let j = 1; j < height; j++){
      Rectangle(theMap, TCLat - LatBetweenMeter * j,TCLng + LngBetweenMeter * i, BCLat - LatBetweenMeter * j, BCLng + LngBetweenMeter * i, getRandomColor());
    }
  }
  
}

function GenerateAllGrids(theMap) {
  // Get the data from the JSON file
  for (let i = 0; i < data.length; i++){
    Grid(theMap, 100, 100, data[i].latitude, data[i].longitude, data[i].latitude + LatBetweenMeter, data[i].longitude + LngBetweenMeter);
  }
};

initMap();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}