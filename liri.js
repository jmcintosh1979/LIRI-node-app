// * Importing the required NPM Packages
var request = require("request");
var moment = require("moment");
var dotEnv = require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");

// * Access the Spotify ID & Secret in the .env file and keys.js file
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// * Variables to take in the users input from the command line
var action = process.argv[2];
var input = process.argv[3];

// * Switch statement to take the "action" request from the command line
// * which will then activate the appropriate function for the "action" 
switch (action) {
  case "concert-this":
    // TODO: Complete this with a function / call to action;
    break;
  case "spotify-this-song":
    songSearch(input);
    break;
  case "movie-this":
    // TODO: Complete this with a function / call to action;
    break;
  case "do-what-it-says":
    // TODO: Complete this with a function / call to action;
    break;
}

function songSearch(song) {
  
  spotify
  .search({
    type: "track",
    query: song,
    limit: 1
  })
  .then(function(response) {

    // * Console logging what song was being passed through and confirming the "path"
    // * was correct for the variable "trackInfo".
    // console.log(song);
    // console.log(response.tracks.items[0])

    var trackInfo = response.tracks.items[0];

    console.log("Artist(s): " + trackInfo.artists[0].name);
    console.log("Song Name: " + trackInfo.name);
    console.log("Link for Song Preview: " + trackInfo.preview_url);
    console.log("Album: " + trackInfo.album.name);
    
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

}



// ! NOTE REALLY SURE WHAT THIS IS FOR, BUT HOMEWORK SAID WE NEEDED TO CREATE IT...JUST NOT REALLY SURE HOW TO USE THESE RIGHT NOW.

// var concert = spotify.concernt,
//     song = spotify.song,
//     movie = spotify.movie,
//     says = spotify.says;

