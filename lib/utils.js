var crypto = require('crypto');

function getSignature(body) {
    var hmac = crypto.createHmac("sha1", process.env.GITHUB_WEBHOOK_SECRET);
    hmac.update(JSON.stringify(body));
    return "sha1=" + hmac.digest("hex");
}

function verifyRequest(req) {
    var expected = req.headers['x-hub-signature'];
    var calculated = getSignature(req.body);
    if (expected !== calculated) {
        return false;
    } else {
        console.log("Valid signature!");
        return true;
    }
}

module.exports = {
    verifyRequest,
}