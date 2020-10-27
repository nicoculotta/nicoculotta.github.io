const express = require('express');
const Twit = require('twit');

// API KEYS TWITTER saved in config.js
const config = require('./config');
const T = new Twit(config);


const app = express();
app.listen(3000, () => { 
    console.log('el server esta OK')
});
app.use(express.static('public'));
app.use(express.json());

var tweetInformation = null;

app.post('/api', (request, response) => {
    // receive the id of the tweet
    const tweetId = request.body.id
        
    T.get(`statuses/show/${tweetId}`, receiveTweet);
    response.json(tweetInformation);
})

// receive info of particular tweet
const receiveTweet = (err, data, response) => {
    if (!err){
        let tweet = data;
        tweetInformation = {
            text: tweet.text,
            name: tweet.user.name,
            screen_name: "@" + tweet.user.screen_name,
            profile_image_url: tweet.user.profile_image_url
        }
        console.log(tweetInformation);
    }
}