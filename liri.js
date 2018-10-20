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
var input = process.argv;

// * Switch statement to take the "action" request from the command line
// * which will then activate the appropriate function for the "action" 
switch (action) {
  case "concert-this":
    concertSearch(input);
    break;
  case "spotify-this-song":
    songSearch(input);
    break;
  case "movie-this":
    movieSearch(input);
    break;
  case "do-what-it-says":
    // TODO: Complete this with a function / call to action;
    break;
  default:
    console.log("You need to put in an action");
}

// * FUNCTION THAT WILL TAKE IN USER INPUT FOR A ARTIST/BAND AND RESPOND WITH 
// * EACH EVENT FOR THE ARTIST/BAND THAT WAS INPUTTED.

// function concertSearch(concert) {

// }

// * FUNCTION THAT WILL TAKE IN USER INPUT FOR A TRACK AND RESPOND WITH THE 
// * ARTISTS(S), SONG NAME, A LINK FOR PREVIEWING THE SONG, AND THE ALBUM NAME

function songSearch(song) {

  var songName = "";

  for (var i = 3; i < song.length; i++) {
    if (i > 3 && i < song.length) {
      songName = songName + "+" + song[i];
    } else {
      songName += song[i];
    }
  }
    // console.log(songName);

  spotify
  .search({
    type: "track",
    query: songName,
    limit: 1
  })
  .then(function(response) {

    // * Console logging what song was being passed through and confirming the "path"
    // * was correct for the variable "trackInfo".
    // console.log(song);
    // console.log(response.tracks.items[0])

    var trackInfo = response.tracks.items[0];

    console.log("-------------------------------------------------");
    console.log("Artist(s): " + trackInfo.artists[0].name);
    console.log("Song Name: " + trackInfo.name);
    console.log("Link for Song Preview: " + trackInfo.preview_url);
    console.log("Album: " + trackInfo.album.name);
    console.log("-------------------------------------------------");
    
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

};

// * FUNCTION THAT WILL TAKE IN USER INPUT FOR A ARTIST/BAND AND RESPOND WITH 
// * EACH EVENT FOR THE ARTIST/BAND THAT WAS INPUTTED.

function movieSearch(movie) {

  var movieName = "";

  for (var i = 3; i < movie.length; i++) {
    if (i > 3 && i < movie.length) {
      movieName = movieName + "+" + movie[i];
    } else {
      movieName += movie[i];
    }
  }
    // console.log(movieName);


  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  // console.log(queryURL);

  request(queryURL, function(error, response, body) {

    var movieResponse = JSON.parse(body);

    if (!error && response.statusCode === 200) {
      console.log("-------------------------------------------------");
      console.log("Movie Title: " + movieResponse.Title);
      console.log("Release Year: " + movieResponse.Year);
      console.log("IMDB Rating: " + movieResponse.imdbRating);
      console.log("Rotten Tomatoes Rating: " + movieResponse.Ratings[1].Value);
      console.log("Country Movie Produced: " + movieResponse.Country);
      console.log("Language of Movie: " + movieResponse.Language);
      console.log("Plot of Movie: " + movieResponse.Plot);
      console.log("Actors: " + movieResponse.Actors);
      console.log("-------------------------------------------------");
    }
  })
}



// ! NOTE REALLY SURE WHAT THIS IS FOR, BUT HOMEWORK SAID WE NEEDED TO CREATE IT...JUST NOT REALLY SURE HOW TO USE THESE RIGHT NOW.

// var concert = spotify.concernt,
//     song = spotify.song,
//     movie = spotify.movie,
//     says = spotify.says;

