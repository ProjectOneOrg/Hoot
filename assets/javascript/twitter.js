var access_token = '';
var hashTag = 'dining';

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
  url: 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashTag + '&count=4',
  //url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + hashTag + '&count=2',
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + access_token
  }
}).then(function(response) {
   var results = response.statuses;
   for (var i = 0; i < results.length; i++) {
     console.log(results);

    var momentDate = moment(results[i].created_at).fromNow();
    var text = results[i].text.replace(/\#/g, "%23");

     $('#twitterbox').append('<div class="tweet">' +
        '<img src="' + results[i].user.profile_image_url + '">'+
        '<a href="' + results[i].user.url + '" target="_blank">' +
        '<span class="username"><strong>' + results[i].user.name + '</strong></span></a>' +
        '<span>@' + results[i].user.screen_name + ' &nbsp;&#x2605&nbsp; ' +  momentDate + '</span>' +
        '<p>' + results[i].text + '</p>' +
        '<iframe src="https://platform.twitter.com/widgets/tweet_button.html?size=l&url=' 
          + results[i].user.url + '&via=' 
          + results[i].user.screen_name + '&related=twitterapi%2Ctwitter&text=' 
          + text + '" width="140" height="28" title="Twitter Tweet Button" style="border: 0; overflow: hidden;"></iframe>' 
          + '</div>' );
   }

 })
})
