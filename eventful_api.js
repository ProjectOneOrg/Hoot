//Using jQuery!!!//
//rest of queryBase = + "&within=" + milesOf + "&units=miles&t=" + dateRange + "&page_size=" + pageSize,

//Possible issues://
	//What happens when a search field is left blank, and therefore doesn't contribute a value to the queryURL?  
	//Can I write code to delete a selection of the queryURL accordingly?//

//API-specific variables//

var queryBase = "https://cors-anywhere.herokuapp.com/https://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=";

//Info from search input//
var location;
var milesOf = 0;
var dateRange;
var pageSize = 10;

//Info generated from AJAX call//
var artist;
var venueLocation;
var venueName;
var venueZip;
var eventUrl;
var eventStart;
var eventDescription;

$("#submit-btn").on("click", function(event) {
	event.preventDefault();
				//"#location" - a placeholder id for whatever our text field is//
	locationValue = $("#location").val().trim().toLowerCase();
	var place = locationValue.replace(new RegExp(" ", "g"), '+');
				//"#dates" - a placeholder id for whatever gives us dates//
	dateRangeValue = $("#dates").val().trim();
	dateRange = dateRangeValue.replace(new RegExp(" ", "g"), '+');
				//"#miles" - a placeholder id for whatever gives us the miles range//
	milesOf = $("#miles").val();
	
	$.ajax({
		url: queryBase + place,
		method: "GET"

	}).then(function(response) {
		console.log(JSON.parse(response,null,2));

		for (var i = 0; i < pageSize; i++) {

		artist = response.events.event[i].title;
		venueLocation = response.events.event[i].venue_address;
		venueName = response.events.event[i].venue_name;
		venueZip = response.events.event[i].postal_code;
		eventUrl = response.events.event[i].url;
		eventStart = response.events.event[i].start_time;
		eventDescription = response.events.event[i].description;

		console.log("Artist: " + artist);
		console.log("Venue Location:  " + venueLocation);
		console.log("Venue Name:  " + venueName);
		console.log("Venue Zip Code:  " + venueZip);
		console.log("Event URL:  " + eventUrl);
		console.log("Event Start Time & Date:  " + eventStart);
		console.log("Event Description:  " + eventDescription);

		}
	});

})

