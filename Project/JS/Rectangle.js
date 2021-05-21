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
        
            let e = this.TopCornerLat + (LatBetweenMeter / 2);
            let a = this.TopCornerLng + (LngBetweenMeter / 2);
            let pos = {e,a};
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
                                    //tradeClass.tradem2();
                                }
                                document.getElementById("content").appendChild(selectMenu);
                                document.getElementById("content").appendChild(submitButton);

                                //Submit Button
                                submitButton.addEventListener ("click", function(){
                                    //Get string value of selected UON
                                    let selectedOwnedUON = document.querySelector("select").value;
                                    
                                    for(let i = 0; i < userData.length; i++){
                                        for(let j = 0; j < userData[i].latitude.length; j++){
                                            //
                                            let UONlat = userData[i].latitude[j];
                                            let UONlng = userData[i].longitude[j];
                                            let unownedUON = {UONlat,UONlng};
                                            unownedUON = Object.values(unownedUON);
                                            console.log(unownedUON);
                                            //Checks the UON untill it corresponts to the selected UON
                                            if(unownedUON == selectedOwnedUON){
                                                for(let k = 0; k < userData.length; k++){
                                                    for(let l = 0; l < userData[k].latitude.length; l++){
                                                        if(unownedUON == this.pos){ 
                                                            userData[k].latitude[l] = 0;
                                                            userData[k].longitude[l] = 0;
                                                            console.log("test");
                                                        }
                                                    }
                                                }
                                                let owned = selectedOwnedUON.split(",");
                                                userData[i].latitude[j] = owned.splice(0,1);
                                                userData[i].longitude[j] = owned;
                                                
                                                this.e = owned.splice(0,1);
                                                this.a = owned;
                                            }
                                        }
                                    }
                                }); 
                            }
                            
                        }
                    }
                }
            }); 

            

            
            let contentString = 
            "The Latitude is: " + e + 
            "<br>" +
            " The Longatude is: " + a +
            "<br>" +
            "Owned by: " + this.user +
            "<br>" +
            "<br>";
            
            document.getElementById("content").innerHTML = contentString;

            let popup = new Popup(
                new google.maps.LatLng(e, a),
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