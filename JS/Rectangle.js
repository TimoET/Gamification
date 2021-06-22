import { Popup } from './Popup.js';
import { LatBetweenMeter } from './GoogleMap.js';
import { LngBetweenMeter } from './GoogleMap.js';
import { TradeButton } from './GoogleMap.js';
import { clickedRect } from './GoogleMap.js';;

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
            strokeWeight: 0.5,
        });

        rectangle.addListener("click", () => {
            //Checks for already existing popups and makes them hidden
            if(document.getElementsByClassName("popup-bubble-anchor")){
                let elements = document.getElementsByClassName("popup-bubble-anchor");
                for(let i = 0; i < elements.length; i++){
                    elements[i].style.display = "none";
                }
            }

            document.getElementById("content").innerHTML = this.contentString;

            //Creates new Popup on this rectangle lat & lng with content
            let popup = new Popup(
                new google.maps.LatLng(this.displayLat, this.displayLng),
                document.getElementById("content")
            );
            
            //Creates the popup on google maps and after 20 miliseconds adds the trade button to the popup
            popup.setMap(theMap);
            setTimeout(() => {
                TradeButton(this.user)
            }, 20);

            this.setValues(this.user,this.color,this.displayLat,this.displayLng);
        });
    }
    addUser(userName){
        this.user = userName;
    }
    setContent(content){
        this.contentString = content;
    }
    setColor(userColor){
        this.color = userColor;
    }
    setValues(user,color,lat,lng){
        clickedRect.user = user;
        clickedRect.color = color;
        clickedRect.lat = lat;
        clickedRect.lng = lng;
    }
    clearRect(rect){
        rect.draw.rectangle.setMap(null);
        //rectangle.clearRect(0,0,rectangle.width,rectangle.height);
    }
}

export { Rectangle };