import { currentUser } from './GoogleMap.js';
import { userData } from './dataImport.js';

class Trade {
    constructor(){

    }
    tradem2(user1Lat, user1Lng, user2Lat, user2Lng){
        //Owned by current user
        let ownedLat = user1Lat;
        let ownedLng = user1Lng;

        //Current user wants this lat & lng
        let wantedLat = user2Lat;
        let wantedLng = user2Lng;

        for(let i = 0; i < userData.length; i++){
            for(let j = 0; j < userData[i].latitude.length; j++){

            }
        }
        console.log("you traded!");
    }
}

export { Trade };