var access_token = '';
var artistName = "Lil Pump";

$.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token',
  method: 'POST',
  headers: {
    'Authorization': 'Basic MWZlMWI3MzlkOGFlNGJiZWE0ZjRhNTg4ODdjODU3M2E6YzBjNmJmNzI1NzMzNDIzNzg3ZTM2ZGVkZWIzNmI4YzI=',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: 'grant_type=client_credentials'  
}).then(function(response){
  //{
  //  "token_type": "bearer",
  //  "access_token": "AAAAAAAAAAAAAAAAAAAAAG4%2F4wAAAAAAc7VjrHvLj48AA%2FaG8%2FqyVgmxWtg%3D0dIwEGQWP6jm3iBH9aElp14zX37uYeQuK2cuP5hppZTpeqtr5v"
  //}
  //Store access token globally
  access_token = response.access_token;

  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?q=" + artistName + "&type=artist",
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function(response) {
    var bands = response.artists.items[0].id;
    // for (var i = 0; i < results.length; i++) {
    //   console.log(bands, i);
    // }
    getTopTracks(bands);
  }) 
})

function getTopTracks(artistId) {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US",
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function(response) {
    console.log(response.tracks[0].name);
    console.log(response.tracks[0].album.release_date);
  })
}

