require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function printSpotifyStats(d, i){
    console.log(d.tracks.items[i].artists[0].name);
    console.log(d.tracks.items[i].name);
    console.log(d.tracks.items[i].external_urls.spotify)
    console.log(d.tracks.items[i].album.name)
}

function printMovieStats(bdy){
    var result = JSON.parse(bdy);
    var arr = ["Title", "Year", "imdbRating", "Country", "Language", "Plot", "Actors"];

    for(var keys in result){
        if(arr.indexOf(keys) > -1){
            console.log(keys + ": " + result[keys]);
        }
        
    }
    console.log(result.Ratings[1].Value);
};


var params = { screen_name: 'BreeDacoder' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        for (var keys in tweets) {
            console.log(tweets[keys].created_at);
            console.log(tweets[keys].text);
        }
    }
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
        spotify.search({ type: 'track', query: 'The Sign' }, function (err, data) {
            printSpotifyStats(data, 5);
        });
    }
    else {
        printSpotifyStats(data, 0);
    }

});


request('http://www.omdbapi.com/?apikey=trilogy&t=It', function (error, response, body) {
    if (JSON.parse(body).Response === "False") {
        request('http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody', function (error, response, body) {
            printMovieStats(body);
        });
    }
    else{
        printMovieStats(body);
    }

});