import { Popup } from './Popup.js';
import { LatBetweenMeter } from './GoogleMap.js';
import { LngBetweenMeter } from './GoogleMap.js';
import { Trade } from './Trade.js';

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
            let pos = {e, a};

            let tradeButton = document.createElement("BUTTON");
            tradeButton.innerText = "Trade";
            
            let tradeClass = new Trade();
            tradeButton.onclick = tradeClass.tradem2();

            console.log(rectangle.fillColor);
            console.log(pos);
            
            let contentString = 
            "The Latitude is: " + e + 
            "<br>" +
            " The Longatude is: " + a +
            "<br>" +
            "Owned by: " + this.user +
            "<br>" +
            "<br>" 
           ;
            
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