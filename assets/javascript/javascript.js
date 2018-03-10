// var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+raleigh&key= AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY&type=restaurant";
// var queryURLB = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+raleigh&key= AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY&type=bar";


function getPlacesData() {

    var foodDrinkQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + 
    "location=" + venueLatitude,venueLongitude + "&radius=500&type=restaurant|bar&key=AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY";
    var foodDrinkID = [];
    // var barID = [];
    var myFoodDrinkQuery;
    // var myBarQuery;

    $.when(

        $.ajax({
            url: foodDrinkQueryURL,
            method: "GET"
        }).then(function(response) {
    
        myFoodDrinkQuery = response.results;
    
        for (i=0; i<myFoodDrinkQuery.length; i++) {
            var  fdplaceID = myFoodDrinkQuery[i].place_id;
            var fdlaceLat = myFoodDrinkQuery[i].geometry.location.lat;
            var fdlaceLng = myFoodDrinkQuery[i].geometry.location.lng;
            foodDrinkID[i] = {
                place: fdplaceID,
                lat: fdlaceLat,
                lng: fdlaceLng
            };
        }
    
        }),


        // $.ajax({
        //     url: queryURLB,
        //     method: "GET"
        // }).then(function(response) {
    
        // myBarQuery = response.results;    
    
        //     for (i=0; i<myBarQuery.length; i++) {
        //         var bplaceID = myBarQuery[i].place_id;
        //         var bplaceLat = myBarQuery[i].geometry.location.lat;
        //         var bplaceLng = myBarQuery[i].geometry.location.lng;
        //         barID[i] = {
        //             place: bplaceID,
        //             lat: bplaceLat,
        //             lng: bplaceLng
        //         };
        //     }
    
        // });

    ).then(function() {

        var places = foodDrinkID;
       
        initMap(places);

    });
}


function initMap(foodDrinkPlaces) {

    var geo = {lat: venueLatitude, lng: venueLongitude};

    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: geo
    });
    
    restaurant(foodDrinkPlaces);

}


function restaurant(foodDrinkID) {

    console.log(foodDrinkID);
  
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    for (i = 0; i < foodDrinkID.length; i++) {  

        var placeID = foodDrinkID[i].place;
        var placeLat = foodDrinkID[i].lat;
        var placeLng = foodDrinkID[i].lng;

        var position = {lat: placeLat, lng: placeLng};

        marker = new google.maps.Marker({
          position: position,
          map: map
        });

        var placeID = foodDrinkID[i].place;

        service.getDetails({
            placeId: placeID
        }, function(place, status) {

            if (status === google.maps.places.PlacesServiceStatus.OK) {

                console.log(place);

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                    infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        });
    }
}





