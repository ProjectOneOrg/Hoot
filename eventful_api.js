//Using jQuery!!!//

//Possible issues://
	//What happens when a search field is left blank, and therefore doesn't contribute a value to the queryURL?  
	//Can I write code to delete a selection of the queryURL accordingly?//


//API-specific variables//
var appKey = hqWvGHfDvqhZ62Bm;
var queryBase = "http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=";

//Info from search input//
var location;
var milesOf = 0;
var dateRange;
var pageSize = 0;

//Info generated from AJAX call//
var artist;
var venueLocation;
var venueName;
var venueZip;
var eventUrl;
var eventStart;
var eventDescription;
$("#submit").on("click", function () {
				//"#location" - a placeholder id for whatever our text field is//
	locationValue = $("#location").val().trim().toLowerCase();
	location = locationValue.replace(new RegExp(" ", "g"), '+');
				//"#dates" - a placeholder id for whatever gives us dates//
	dateRangeValue = $("#dates").val().trim();
	dateRange = dateRangeValue.replace(new RegExp(" ", "g"), '+');
				//"#miles" - a placeholder id for whatever gives us the miles range//
	milesOf = $("#miles").val();
	
	$.ajax({
		url: queryBase + location + "&within=" + milesOf + "&units=miles&t=" + dateRange + "&page_size=" + pageSize,
		method: "GET"

	}).then(function(response) {
		for (var i = 0; i < pageSize; i++) {

		artist = response.events.event[i].title;
		venueLocation = response.events.event[i].venue_address;
		venueName = response.events.event[i].venue_name;
		venueZip = response.events.event[i].postal_code;
		eventUrl = response.events.event[i].url;
		eventStart = response.events.event[i].start_time;
		eventDescription = response.events.event[i].description;

		}
	});

})

