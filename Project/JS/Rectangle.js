import { Popup } from './Popup.js';
import { LatBetweenMeter } from './GoogleMap.js';
import { LngBetweenMeter } from './GoogleMap.js';
import { TradeButton } from './GoogleMap.js';

class Rectangle {
    constructor(TopCornerLat, TopCornerLng, BotCornerLat, BotCornerLng, color) {
        this.TopCornerLat = TopCornerLat;
        this.TopCornerLng = TopCornerLng;
        this.BotCornerLat = BotCornerLat; 
        this.BotCornerLng = BotCornerLng;
        this.color = color;
        this.user;
        this.displayLat = TopCornerLat + (LatBetweenMeter / 2);
        this.displayLng = TopCornerLng + (LngBetweenMeter / 2);
        this.contentString;
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

            if(document.getElementById("popup-bubble-anchor")){
                document.getElementById("popup-bubble-anchor").style.display = "none";
            }

            document.getElementById("content").innerHTML = this.contentString;

            let popup = new Popup(
                new google.maps.LatLng(this.displayLat, this.displayLng),
                document.getElementById("content")
            );
            
            popup.setMap(theMap);
            setTimeout(() => {
                TradeButton(this.user)
            }, 20);
            
        });
    }
    addUser(userName){
        this.user = userName;
    }
    setContent(content){
        this.contentString = content;
    }
}

export { Rectangle };