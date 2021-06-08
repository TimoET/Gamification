import { data } from './dataImport.js';
import { userData } from './dataImport.js';
import { Rectangle } from './Rectangle.js';
import { Trade } from './Trade.js';

// Amount of Latitude and longatute between meters
let LatBetweenMeter = 0.000085;
let LngBetweenMeter = 0.0001000;

export { LatBetweenMeter };
export { LngBetweenMeter };

//Grid width and height
let gridWidth = 10;
let gridHeigt = 10;

let currentUser = userData[0].userName;
export { currentUser };

let allRects = [];

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
  
  for(let i = 0; i < witdh; i++){
    for(let j = 0; j < height; j++){
      let rectangle = new Rectangle(TCLat - LatBetweenMeter * j,TCLng + LngBetweenMeter * i, BCLat - LatBetweenMeter * j, BCLng + LngBetweenMeter * i, "#808080");
      rectangle.draw(theMap);
      allRects.push(rectangle);
    }
  }

  for(let i = 0; i < allRects.length; i++){
    let centerOfRectLat = allRects[i].TopCornerLat + (LatBetweenMeter / 2);
    let centerOfRectLng = allRects[i].TopCornerLng + (LngBetweenMeter / 2);
    allRects[i].setContent(Content(centerOfRectLat,centerOfRectLng, "UNOWNED"));

    for(let j = 0; j < userData.length; j++){
      for(let k = 0; k < userData[j].latitude.length; k++){
        if(userData[j].latitude[k] == allRects[i].TopCornerLat + (LatBetweenMeter / 2) && userData[j].longitude[k] == allRects[i].TopCornerLng + (LngBetweenMeter / 2)){
          console.log("UON owned");
          allRects[i].addUser(userData[j].userName);
          allRects[i].setContent(Content(centerOfRectLat,centerOfRectLng, userData[j].userName));
          allRects[i].setColor(userData[j].color);
          allRects[i].draw(theMap);
        }
      }
    }
  } 
}

function GenerateAllGrids(theMap) {
  for (let i = 0; i < data.length; i++){
    Grid(theMap, gridWidth, gridHeigt, data[i].latitude, data[i].longitude, data[i].latitude + LatBetweenMeter, data[i].longitude + LngBetweenMeter);
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

function Content(lat,lng,name){
  let popUpContent = "The Latitude is: " + lat + 
  "<br>" +
  " The Longatude is: " + lng +
  "<br>" +
  "Owned by: " + name +
  "<br>" +
  "<br>";
  return popUpContent;
}

function TradeButton(rectUser){
  let tradeButton = document.createElement("BUTTON");
  tradeButton.innerText = "Trade";
  document.getElementById("content").appendChild(tradeButton);

  let thisRectUser = rectUser;

  tradeButton.addEventListener ("click", function(){
      if(currentUser == thisRectUser){
          alert("Unable to trade, you own this UON");
      }
      //Clicked square not owned by current user
      else if(currentUser != thisRectUser){
          Select();
      }
  }); 
}
function Select(){
  for(let i = 0; i < userData.length; i++){
    //Loops through userData to find the currentUser 
    if(userData[i].userName == currentUser){
        console.log(userData[i].userName);
        //Check if a select menu already exists
        if(document.querySelector("select") == null){
            let selectMenu = document.createElement("select"); 
            //For loop that creates a select menu of all the UON the logged-in user owns.
            for(let j = 0; j < userData[i].latitude.length; j++){
                let option = document.createElement('option');
                let lat = userData[i].latitude[j];
                let lng = userData[i].longitude[j];
                let uon = {lat,lng};
                console.log(uon);
                option.setAttribute("value", Object.values(uon));
                option.innerHTML = Object.values(uon);
                selectMenu.add(option, 0);
            }
            document.getElementById("content").appendChild(selectMenu);
            Submit();
          }
      }
  }
}
function Submit(){
  //Create submit button
  let submitButton = document.createElement("BUTTON");
  submitButton.innerText = "Submit";
  document.getElementById("content").appendChild(submitButton);

  //Listen for click
  submitButton.addEventListener ("click", function(){
    //Get string value of selected owned UON
    let selectedOwnedUON = document.querySelector("select").value;

    //Splits the string value into 2 values
    let owned = selectedOwnedUON.split(",");
    let ownedLat = owned.splice(0,1);
    let ownedLng = owned;

    //Trade the selected UON for the clicked square UON
    let tradeClass = new Trade();
    tradeClass.tradem2(ownedLat,ownedLng,this.displayLat,this.displayLng);


    //allRects[i].setContent(Content(centerOfRectLat,centerOfRectLng, userData[j].userName));
    console.log(allRects[9]);
    this.contentString = Content(ownedLat,ownedLng,currentUser);
    TradeButton(this.user);
    console.log(this.user);
    document.getElementById("content").innerHTML = this.contentString;
    
  }); 
}

export {TradeButton};