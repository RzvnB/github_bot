function beautify_issue_comment(payload, callback) {
    try {
        var userName = payload.comment.user.login
        var name = payload.issue.title
        var link = payload.comment.html_url
        var message = userName + " commented on the following issue:     " + name + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_commit_comment(payload, callback) {
    try {
        var userName = payload.comment.user.login
        var link = payload.comment.html_url
        var message = userName + " commented on a commit "  + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_create(payload, callback) {
    try {
        var type = payload.ref_type
        var userName = payload.sender.login
        var link = payload.repository.html_url
        var message = userName + " created a new " + type + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_delete(payload, callback) {
    try {
        var what = payload.ref_type
        var userName = payload.issue.user.login
        var link = payload.repository.html_url
        var message = userName + " deleted a " + what + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_issues(payload, callback) {
    try {
        var action = payload.action
        var userName = payload.sender.login
        var name = payload.issue.title
        var link = payload.issue.html_url
        var message = userName + " " + action + " issue:     " + name + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_pull_request(payload, callback) {
    try {
        var action = payload.action
        var userName = payload.sender.login
        var name = payload.pull_request.title
        var link = payload.pull_request.html_url
        var message = userName + " " + action + " pull request:     " + name + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_pull_request_review(payload, callback) {
    try {
        var action = payload.action
        var userName = payload.sender.login
        var name = payload.pull_request.title
        var link = payload.review.html_url
        var message = userName + " " + action + " pull request review on pull request:     " + name + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_pull_request_review_comment(payload, callback) {
    try {
        var action = payload.action
        var userName = payload.sender.login
        var name = payload.pull_request.title
        var link = payload.comment.html_url
        var message = userName + " " + action + " pull request review comment on pull request:     " + name + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
}

function beautify_push(payload, callback) {
    try {
        var action = "pushed"
        var userName = payload.sender.login
        var name = payload.ref
        var link = payload.compare
        var message = userName + " " + action + " on branch:     " + name + "\n" + link;
        callback(null, message);
    } catch (err) {
        callback(new Error("Event-payload mismatch\n"));
    }
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