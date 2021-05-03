import { Popup } from './Popup.js';
import { LatBetweenMeter } from './GoogleMap.js';
import { LngBetweenMeter } from './GoogleMap.js';

class Rectangle {
    constructor(TopCornerLat, TopCornerLng, BotCornerLat, BotCornerLng, color, clickable) {
        this.TopCornerLat = TopCornerLat;
        this.TopCornerLng = TopCornerLng;
        this.BotCornerLat = BotCornerLat; 
        this.BotCornerLng = BotCornerLng;
        this.color = color;
        this.clickable = clickable || false;
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

            console.log(rectangle.fillColor);
            console.log(pos);

            let contentString = "The Latitude is: " + e + "<br>" +" The Longatude is: " + a;
            document.getElementById("content").innerHTML = contentString;

            let popup = new Popup(
                new google.maps.LatLng(e, a),
                document.getElementById("content")
            );
            popup.setMap(theMap);
        });
    }
}

export { Rectangle };