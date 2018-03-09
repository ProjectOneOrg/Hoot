var access_token = '';

$("#spotifyTest").on("click", function() {
  event.preventDefault();
  var artist = $("#artist").val().trim();
  
  $().ajax({
    url: 'https://accounts.spotify.com/api/token'
    method: 'POST',
    headers: {
      Authorization: 'Basic MWZlMWI3MzlkOGFlNGJiZWE0ZjRhNTg4ODdjODU3M2E6YzBjNmJmNzI1NzMzNDIzNzg3ZTM2ZGVkZWIzNmI4YzI='
      'Content-Type': application/x-www-form-urlencoded
    },
    data: "grant_type=client_credentials" 
  }).then(function(response){
    //{
    //  "token_type": "bearer",
    //  "access_token": "AAAAAAAAAAAAAAAAAAAAAG4%2F4wAAAAAAc7VjrHvLj48AA%2FaG8%2FqyVgmxWtg%3D0dIwEGQWP6jm3iBH9aElp14zX37uYeQuK2cuP5hppZTpeqtr5v"
    //}

    //Store access token globally
    access_token = response.access_token;
  })

  $().ajax({
    url: 'https://api.spotify.com/v1/search?q=Green Day&type=artist' + hashTag
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function(response) {
    // YAY tweets
  })  
})
