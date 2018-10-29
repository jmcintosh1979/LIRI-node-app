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
var inputData = "";

for (let i = 3; i < input.length; i++) {
  if (i > 3 && i < input.length) {
    inputData = inputData + "+" + input[i];
  } else {
    inputData += input[i];
  }
};

// * Switch statement to take the "action" request from the command line
// * which will then activate the appropriate function for the "action" 
switch (action) {
  case "concert-this":
    concertSearch(inputData);
    break;
  case "spotify-this-song":
    songSearch(inputData);
    break;
  case "movie-this":
    movieSearch(inputData);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("You need to put in an action");
};

// ! NOTE REALLY SURE WHAT THIS IS FOR, BUT HOMEWORK SAID WE NEEDED TO CREATE IT...JUST NOT REALLY SURE HOW TO USE THESE RIGHT NOW.

// var concert = spotify.concernt,
//     song = spotify.song,
//     movie = spotify.movie,
//     says = spotify.says;

// * FUNCTION THAT WILL TAKE IN USER INPUT FOR A ARTIST/BAND AND RESPOND WITH 
// * EACH EVENT FOR THE ARTIST/BAND THAT WAS INPUTTED.

function concertSearch(artist) {

  // console.log(artist);

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
  console.log(queryURL);

  request(queryURL, function(error, response) {

    var concertResponse = JSON.parse(response.body);

    // console.log(concertResponse)
    
    if (!error && response.statusCode === 200) {
      for (i = 0; i < concertResponse.length; i++) {
        console.log("-------------------------------------------------");
        console.log("Name of Venue: " + concertResponse[i].venue.name);
        console.log("Venue Location: " + concertResponse[i].venue.city);
        
        var dateResponse = JSON.parse(response.body)[i].datetime;
        var convertedTime = moment(dateResponse).format("MM/DD/YYYY");
        console.log("Date of Event: " + convertedTime);
        console.log("-------------------------------------------------");
      }
    }
  })
};

// * FUNCTION THAT WILL TAKE IN USER INPUT FOR A TRACK AND RESPOND WITH THE 
// * ARTISTS(S), SONG NAME, A LINK FOR PREVIEWING THE SONG, AND THE ALBUM NAME

function songSearch(song) {

  // var songName = "";

  // for (var i = 3; i < song.length; i++) {
  //   if (i > 3 && i < song.length) {
  //     songName = songName + "+" + song[i];
  //   } else {
  //     songName += song[i];
  //   }
  // }
    // console.log(song);

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

  // var movieName = "";

  // for (var i = 3; i < movie.length; i++) {
  //   if (i > 3 && i < movie.length) {
  //     movieName = movieName + "+" + movie[i];
  //   } else {
  //     movieName += movie[i];
  //   }
  // }
    // console.log(movie);


  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  
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
};

// * FUNCTION THAT WILL TAKE IN THE TEXT IN THE RANDOM.TXT FILE AND TRIGGER 
// * ONE OF THE ABOVE FUNCTIONS. 

function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function(error, randomData) {

    if (error) {
      return console.log(error);
    }

    var randomInfo = randomData.split(",");
    var randomAction = randomInfo[0];
    var randomInput = randomInfo[1];
  
    console.log("***************************\n" + randomAction + "\n" + randomInput + "\n***************************");

    switch (randomAction) {
      case "concert-this":
        concertSearch(randomInput);
        break;
      case "spotify-this-song":
        songSearch(randomInput);
        break;
      case "movie-this":
        movieSearch(randomInput);
        break;
      default:
        console.log("You need to put in an action");
    }
  })
};