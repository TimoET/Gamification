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
                if(userData[i].latitude[j] == wantedLat && userData[i].longitude[j] == wantedLng){
                    userData[i].latitude[j] == user1Lat;
                    userData[i].longitude[j] == user1Lng;

                    // console.log("User 1 lat & lng");
                    // console.log(user1Lat,user1Lng);
                    // console.log("Switched lat & lng");
                    // console.log(userData[i].latitude[j],userData[i].longitude[j]);
                }
                else if(userData[i].latitude[j] == ownedLat && userData[i].longitude[j] == ownedLng){
                    userData[i].latitude[j] == user2Lat;
                    userData[i].longitude[j] == user2Lng;

                    // console.log("User 2 lat & lng");
                    // console.log(user2Lat,user2Lng);
                    // console.log("Switched lat & lng");
                    // console.log(userData[i].latitude[j],userData[i].longitude[j]);
                }
            }
        }
        console.log("you traded!");
    }
}

export { Trade };