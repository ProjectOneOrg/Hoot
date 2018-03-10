var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+raleigh&key= AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY&type=restaurant";
var queryURLB = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+raleigh&key= AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY&type=bar";


function getPlacesData() {

    var restaurantID = [];
    var barID = [];
    var myRestaurantQuery;
    var myBarQuery;

    $.when(

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
    
        myRestaurantQuery = response.results;
    
        for (i=0; i<myRestaurantQuery.length; i++) {
            var  rplaceID = myRestaurantQuery[i].place_id;
            var rplaceLat = myRestaurantQuery[i].geometry.location.lat;
            var rplaceLng = myRestaurantQuery[i].geometry.location.lng;
            restaurantID[i] = {
                place: rplaceID,
                lat: rplaceLat,
                lng: rplaceLng
            };
        }
    
        }),


        $.ajax({
            url: queryURLB,
            method: "GET"
        }).then(function(response) {
    
        myBarQuery = response.results;    
    
            for (i=0; i<myBarQuery.length; i++) {
                var bplaceID = myBarQuery[i].place_id;
                var bplaceLat = myBarQuery[i].geometry.location.lat;
                var bplaceLng = myBarQuery[i].geometry.location.lng;
                barID[i] = {
                    place: bplaceID,
                    lat: bplaceLat,
                    lng: bplaceLng
                };
            }
    
        })

    ).then(function() {

        var places = {
            restaurants: restaurantID, 
            bars: barID
        };
       
        initMap(places);

    });
}


function initMap(foodDrinkPlaces) {

    var placeLat = 35.7781944;
    var placeLng = -78.6404271;

    var geo = {lat: placeLat, lng: placeLng};
    var restaurantID = foodDrinkPlaces.restaurants;
    var barID = foodDrinkPlaces.bars;

    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: geo
    });
    
    restaurant(map, restaurantID, barID);

}


function restaurant(map, restaurantID, barID) {

    console.log(restaurantID, barID);
  
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    for (i = 0; i < restaurantID.length; i++) {  

        var placeID = restaurantID[i].place;
        var placeLat = restaurantID[i].lat;
        var placeLng = restaurantID[i].lng;

        var position = {lat: placeLat, lng: placeLng};

        marker = new google.maps.Marker({
          position: position,
          map: map
        });

        var placeID = restaurantID[i].place;

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





