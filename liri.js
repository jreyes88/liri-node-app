var keyData = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var action = process.argv[2];
var searchParamater = "";

// ===== Method to combine multiple word searches into one usable term ===== //
for (var i = 3; i < process.argv.length; i++){

    if (i  > 3 && i < process.argv.length){

        searchParamater = searchParamater + "+" + process.argv[i];

    }

    else {

        searchParamater = searchParamater + process.argv[i];
    }
}

// ===== Twitter ===== //
function myTweets() {
	var client = new Twitter({
		consumer_key: keyData.twitterKeys.consumer_key,
		consumer_secret: keyData.twitterKeys.consumer_secret,
		access_token_key: keyData.twitterKeys.access_token_key,
		access_token_secret: keyData.twitterKeys.access_token_secret
	});

	var params = {
		screen_name: 'moonlit_migas',
		count: 20,
		trim_user: true
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
	        for (i = 0; i < 20; i++) {
	            var returnItems = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnItems);
	        }
	    };
	});
}

// ===== Spotify ===== //
function spotifyThisSong() {

    if (searchParamater == "") {
        searchParamater = "What's My Age Again?";
    };

    spotify.search({ type: 'track', query: searchParamater }, function(err, data) {

        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
        }
     
    });
};

// ===== OMDB (Yeah You Know Me) ===== //
function movieThis() {
    if (searchParamater == "") {
        searchParamater = "Mr. Nobody";
    };

    var queryUrl = 'http://www.omdbapi.com/?t=' + searchParamater +'&y=&plot=short&r=json';

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode == 200) {

            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
        }
    });
};

// ===== Do What It Says ===== //
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

    // We will then print the contents of data

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(',');

        action = dataArr[0];
        console.log(action);
        for (var i = 1; i < dataArr.length; i++){

            if (i  > 1 && i < dataArr.length){

                searchParamater = searchParamater + "+" + dataArr[i];

            }

            else {

                searchParamater = searchParamater + dataArr[i];
            };
        };
        switch (action) {
            case 'my-tweets':
                myTweets();
                break;
            case 'spotify-this-song':
                spotifyThisSong();
                break;
            case 'movie-this':
                movieThis();
                break;
        };
    });
};

// ===== Switch Case ===== //
switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}   