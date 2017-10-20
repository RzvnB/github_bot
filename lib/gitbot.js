var facebook = require('facebook-chat-api');
var Q = require('q');

var Gitbot = function Constructor(settings) {
    this.settings = settings;
    this.api = null;
    this.groupThreadId = null;
}

Gitbot.prototype.setup = function() {
    return this.login()
            .then(() => this.findGroupChatThreadId())
            .then(() => {
                if (!this.groupThreadId) {
                    throw new Error("Unable to find group chat in the 30 most recent conversations!");
                }
            });
}

Gitbot.prototype.login = function() {
    return Q.nfcall(facebook, this.settings.facebook).then(api => {
        console.log("Logged into Facebook");
        this.api = api;
    }).catch(err => {
        console.error(err);
        throw new Error("Unable to log into facebook!");
    });
}

Gitbot.prototype.findGroupChatThreadId = function() {
    return Q.nfcall(this.api.getThreadList, 0, 30)
    .then(arr => {
        this.groupThreadId = arr.find((threadObj) => {
            return threadObj.name === this.settings.group_chat_name;
        }).threadID;
        console.log("Thread ID is " + this.groupThreadId);
    })
    .catch(err => {
        throw new Error("Unable to get group chat!");
    })
}

Gitbot.prototype.sendMessage = function(message) {
    this.api.sendMessage(message, this.groupThreadId);
}

module.exports = Gitbot;