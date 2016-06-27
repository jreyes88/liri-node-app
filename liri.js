var keyData = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var argumentOne = process.argv[2];
var argumentTwo = process.argv[3];

// =========== Twitter ========== //

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

// ========== Spotify ========== //

function spotifyThisSong() {
	var spotifySong = 'whats+my+age+again';
    // html validation using regex
    var htmlProofThatSong = function(argument) {
        if (argument == null) {
            spotifySong = 'whats+my+age+again';
            return spotifySong;
        } else {
            spotifySong = argument.replace(/-/g, '+');
            return spotifySong;
        }
    };
    htmlProofThatSong(argument);

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/search?q=' + spotifySong + '&type=track&limit=1',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json'
                },
                json: true
            };
            //returns Spotify information
            request.get(options, function(error, response, body) {
                var returnItems = (body.tracks.items[0].artists[0].name + '\n' + body.tracks.items[0].name + '\n' + body.tracks.items[0].external_urls.spotify + '\n' + body.tracks.items[0].album.name);
                console.log(returnItems);
                fs.appendFile('files/log.txt', returnItems, 'utf-8', function(error) {
                    if (error) {
                        throw error
                    };
                })
            });
        }
    });
};

if (argumentOne == 'my-tweets') {
	myTweets();
}

if (argumentOne == 'spotify-this-song') {
	console.log("Spotify is a go")
	spotifyThisSong();
}