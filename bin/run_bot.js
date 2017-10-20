var Gitbot = require('../lib/gitbot');
var express = require('express');
var bodyParser = require('body-parser');
var utils = require('../lib/utils');
var beautify = require('../lib/beautify');
var app = express();

var envVars = [
    'FACEBOOK_EMAIL',
    'FACEBOOK_PASSWORD',
    'FACEBOOK_GROUP_CHAT_NAME',
    'GITHUB_WEBHOOK_SECRET'
];

envVars.forEach(function(name) {
    if (process.env[name] == null)
        throw new Error('Environment Variable ' + name + ' not set');
});

var settings = {
    facebook: {
        email: process.env.FACEBOOK_EMAIL,
        password: process.env.FACEBOOK_PASSWORD,
    },
    group_chat_name: process.env.FACEBOOK_GROUP_CHAT_NAME
};

var gitbot = new Gitbot(settings);

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world, I am a chat bot');
});

app.post('/webhook/', (req, res) => {
    
    // if(req.headers['x-hub-signature'] && utils.verifyRequest(req)) {
        var funcName = "beautify_" + req.headers['x-github-event'];
        beautify(funcName, req.body, (err, message) => {
            if(err) {
                res.status(400).send(err.message);
            }
            res.status(200).send(message);
        });
    // } else {
        // res.status(400).send("Invalid signature\n");
    // }
});

app.listen(app.get('port'), () => {
    console.log('running on port', app.get('port'));
});

// gitbot
//     .setup()
//     .then(
//         () => app.listen(app.get('port'), () => {
//             console.log('running on port', app.get('port'));
//         })
//     )
//     .catch((err) => console.log(err.message));
