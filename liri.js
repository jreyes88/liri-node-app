var keyData = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var action = process.argv[2];
var searchParamater = "";

console.log(action);

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
        searchParamater = "What's My Name Again?";
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

// ===== Switch Case ===== //
switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
}
//     case 'movie-this':
//         movieThis();
//         break;
// ​
//     case 'do-what-it-says':
//         doWhatItSays();
//         break;