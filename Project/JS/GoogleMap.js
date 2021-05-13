import { data } from './dataImport.js';
import { userData } from './dataImport.js';
import { Rectangle } from './Rectangle.js';
// Amount of Latitude and longatute between meters
let LatBetweenMeter = 0.000085;
let LngBetweenMeter = 0.0001000;

export { LatBetweenMeter };
export { LngBetweenMeter };

//Grid width and height
let gridWidth = 10;
let gridHeigt = 10;


//initial map creation with start lat and lng
function initMap() {
    let location = { lat: 40.0441405, lng: -7.125136 };
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
initMap();

//Red markers on the map
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

function Grid(theMap, witdh, height, TCLat, TCLng, BCLat, BCLng){
  //Rectangles array
  let allRects = [];
  for(let i = 0; i < witdh; i++){
    for(let j = 0; j < height; j++){
      let rectangle = new Rectangle(TCLat - LatBetweenMeter * j,TCLng + LngBetweenMeter * i, BCLat - LatBetweenMeter * j, BCLng + LngBetweenMeter * i, getRandomColor(), true);
      rectangle.draw(theMap);
      allRects.push(rectangle);
    }
  }

  for(let i = 0; i < allRects.length; i++){
    for(let j = 0; j < userData.length; j++){
      for(let k = 0; k < userData[j].latitude.length; k++){
        if(userData[j].latitude[k] == allRects[i].TopCornerLat + (LatBetweenMeter / 2) && userData[j].longitude[k] == allRects[i].TopCornerLng + (LngBetweenMeter / 2)){
          console.log("UON owned");
          allRects[i].addUser(userData[j].userName);
        }
      }
    }
  }  
}

function GenerateAllGrids(theMap) {
  for (let i = 0; i < data.length; i++){
    Grid(theMap, gridWidth, gridHeigt, data[i].latitude, data[i].longitude, data[i].latitude + LatBetweenMeter, data[i].longitude + LngBetweenMeter, true);
  }
};



function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

