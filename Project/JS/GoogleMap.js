function initMap() {
    let location = { lat: -34.397, lng: 150.644 };
    let map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 8,
  });
}

initMap();