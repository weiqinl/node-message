var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/*
var messageRecord = {
        recordId: this.recordId,
        msgType: this.msgType,
        msgContent: this.msgContent, 
        senderName: this.senderName,
        senderId: this.senderId ,
        status: this.status ,
        isDeleted: this.isDeleted,
        time: time
    };
 */

router.post('/send', function(req, res) {
	var msgType = req.body.msgType;
	var msgContent = req.body.msgContent;
	var newdd = '";';
});


module.exports = router;