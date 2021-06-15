import { userData } from './dataImport.js';
import { allRects } from './GoogleMap.js';
import { Content } from './GoogleMap.js';

class Trade {
    constructor(){

    }
    tradem2(user1, user1Color, user1Lat, user1Lng, user2, user2Color, user2Lat, user2Lng, theMap){
        //Owned by current user
        let ownedLat = user1Lat;
        let ownedLng = user1Lng;

        //Current user wants this lat & lng
        let wantedLat = user2Lat;
        let wantedLng = user2Lng;

        for(let i = 0; i < userData.length; i++){
            for(let j = 0; j < userData[i].latitude.length; j++){
                if(userData[i].latitude[j] == wantedLat && userData[i].longitude[j] == wantedLng){
                    userData[i].latitude[j] = user1Lat;
                    userData[i].longitude[j] = user1Lng;

                    // console.log("User 1 lat & lng");
                    // console.log(user1Lat,user1Lng);
                    // console.log("Switched lat & lng");
                    // console.log(userData[i].latitude[j],userData[i].longitude[j]);
                }
                else if(userData[i].latitude[j] == ownedLat && userData[i].longitude[j] == ownedLng){
                    userData[i].latitude[j] = user2Lat;
                    userData[i].longitude[j] = user2Lng;
                    
                    // console.log("User 2 lat & lng");
                    // console.log(user2Lat,user2Lng);
                    // console.log("Switched lat & lng");
                    // console.log(userData[i].latitude[j],userData[i].longitude[j]);
                }
            }
        }
        for(let i = 0; i < allRects.length; i++){
            if(allRects[i].displayLat == ownedLat && allRects[i].displayLng == ownedLng){
                allRects[i].addUser(user2);
                allRects[i].setContent(Content(user2Lat,user2Lng, user2));
                allRects[i].setColor(user2Color);
                allRects[i].draw(theMap);
            }
            else if(allRects[i].displayLat == wantedLat && allRects[i].displayLng == wantedLng){
                allRects[i].addUser(user1);
                allRects[i].setContent(Content(user1Lat,user1Lng, user1));
                allRects[i].setColor(user1Color);
                allRects[i].draw(theMap);
            }
        }

        console.log("you traded!");
    }
}

export { Trade };