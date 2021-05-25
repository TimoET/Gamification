import { Popup } from './Popup.js';
import { LatBetweenMeter } from './GoogleMap.js';
import { LngBetweenMeter } from './GoogleMap.js';
import { Trade } from './Trade.js';
import { currentUser } from './GoogleMap.js';
import { userData } from './dataImport.js';

class Rectangle {
    constructor(TopCornerLat, TopCornerLng, BotCornerLat, BotCornerLng, color, clickable) {
        this.TopCornerLat = TopCornerLat;
        this.TopCornerLng = TopCornerLng;
        this.BotCornerLat = BotCornerLat; 
        this.BotCornerLng = BotCornerLng;
        this.color = color;
        this.clickable = clickable || false;
        this.user;
    }
    draw(theMap){
        let rectangle = new google.maps.Rectangle({
            map: theMap,
            bounds: new google.maps.LatLngBounds(
              new google.maps.LatLng (this.TopCornerLat, this.TopCornerLng),
              new google.maps.LatLng (this.BotCornerLat, this.BotCornerLng)
            ),
            fillColor: this.color,
            strokeColor: this.color,
            strokeWeight: 1,
        });

        rectangle.addListener("click", () => {
            console.log('clicked');
        
            let thisRectLat = this.TopCornerLat + (LatBetweenMeter / 2);
            let thisRectLng = this.TopCornerLng + (LngBetweenMeter / 2);

            let contentString = 
            "The Latitude is: " + thisRectLat + 
            "<br>" +
            " The Longatude is: " + thisRectLng +
            "<br>" +
            "Owned by: " + this.user +
            "<br>" +
            "<br>";

            let tradeButton = document.createElement("BUTTON");
            tradeButton.innerText = "Trade";
            
            let tradeClass = new Trade();
            let thisRectUser = this.user;

            //Trade button
            tradeButton.addEventListener ("click", function(){
                if(currentUser == thisRectUser){
                    alert("Unable to trade, you own this UON");
                }
                //If the currentUser is not the same User of the square that has been clicked
                else if(currentUser != thisRectUser){
                    for(let i = 0; i < userData.length; i++){
                        //Loops through userData to find the currentUser 
                        if(userData[i].userName == currentUser){
                            console.log(userData[i].userName);
                            //Check if a select menu already exists
                            if(document.querySelector("select") == null){
                                let selectMenu = document.createElement("select"); 
                                let submitButton = document.createElement("BUTTON");
                                submitButton.innerText = "Submit";
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

                                    //console.log(userData[i].latitude[j],userData[i].longitude[j]);
                                    
                                }
                                document.getElementById("content").appendChild(selectMenu);
                                document.getElementById("content").appendChild(submitButton);

                                //Submit Button
                                submitButton.addEventListener ("click", function(){
                                    //Get string value of selected UON
                                    let selectedOwnedUON = document.querySelector("select").value;
                                    let owned = selectedOwnedUON.split(",");
                                    let ownedLat = owned.splice(0,1);
                                    let ownedLng = owned;

                                    tradeClass.tradem2(ownedLat,ownedLng,thisRectLat,thisRectLng);

                                    contentString.replace(String(thisRectLat),String(ownedLat));
                                    contentString.replace(String(thisRectLng),String(ownedLng));
                                    console.log(contentString);
                                }); 
                            }
                            
                        }
                    }
                }
            }); 

            document.getElementById("content").innerHTML = contentString;

            let popup = new Popup(
                new google.maps.LatLng(thisRectLat, thisRectLng),
                document.getElementById("content"),
                tradeButton
            );

            popup.setMap(theMap);
        });
    }
    addUser(userName){
        this.user = userName;
    }
}

export { Rectangle };