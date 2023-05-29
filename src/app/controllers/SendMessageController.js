class SendMessageController {
    // [post] /send-message 
    send = (res, req, next) => {
        res.send(JSON.stringify(req.body));
    }
}

module.exports = new SendMessageController();