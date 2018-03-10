var access_token = '';
var hashTag = 'oprah';

//run this function on window load
$.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token',
  method: 'POST',
  headers: {
    'Authorization': 'Basic bVlNSHh6NG1EeTNPWVRVTHpiZ2lMT0JmMDpCV2lBd2ExeUJPVDJkSDZNVVB2UXJ6OGxVOGhJa01NTUxVcVN1ZHI4VHM2YktPdk9TOQ==',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: 'grant_type=client_credentials'
}).then(function(response){
  access_token = response.access_token;


  //This function needs to run on "search artist" click
  $.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashTag + '&count=5',
  //url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + hashTag + '&count=2',
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + access_token
  }
}).then(function(response) {
   var results = response.statuses;
   for (var i = 0; i < results.length; i++) {
     console.log(results);
     //$('<div class="tweet"></div>').appendTo('#twitterbox');
     $('#twitterbox').append('<div class="tweet"><p>' + results[i].text + '</p><img src="' + results[i].user.profile_image_url + '"></div>' );
   }
})
})

