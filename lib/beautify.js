function beautify_issue_comment(payload, callback) {
    try {
        var who = payload.comment.user.login
        var where = payload.issue.title
        var link = payload.comment.html_url
        var message = who + " commented on the following issue:     " + where + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(callback(new Error("Event-payload mismatch\n")));
    }
}

function beautify_commit_comment(payload, callback) {
    try {
        var who = payload.comment.user.login
        var link = payload.comment.html_url
        var message = who + " commented on a commit "  + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(callback(new Error("Event-payload mismatch\n")));
    }
}

function beautify_create(payload, callback) {
    try {
        var what = payload.ref_type
        var who = payload.sender.login
        var link = payload.repository.html_url
        var message = who + " created a new " + what + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(callback(new Error("Event-payload mismatch\n")));
    }
}

function beautify_delete(payload, callback) {
    try {
        var what = payload.ref_type
        var who = payload.sender.login
        var link = payload.repository.html_url
        var message = who + " deleted a " + what + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(callback(new Error("Event-payload mismatch\n")));
    }
}

function beautify_issues(payload) {
    
}

function beautify_pull_request(payload) {

}

function beautify_pull_request_review(payload) {

}

function beautify_pull_request_review_comment(payload) {

}

function beautify_push(payload) {

}

function delegate(funcName, payload, callback) {
    if (supportedEvents[funcName]) {
        supportedEvents[funcName](payload, callback);
    } else {
        callback(new Error("Event not supported\n"));
    }
}

var supportedEvents = {
    beautify_issue_comment,
    beautify_commit_comment,
    beautify_create,
    beautify_delete,
    beautify_issues,
    beautify_pull_request,
    beautify_pull_request_review,
    beautify_pull_request_review_comment,
    beautify_push,
}

module.exports = delegate;