var db = require('./db');


 // {
 //        recordId: '2016121910240001', //string 记录id   
 //        msgType: 0, //int 消息类型 
 //        msgContent: '这是消息内容', //string 消息内容 
 //        sendTime: {
 //            date: '2016-12-19 10:26:57', //date 消息发送时间
 //            year: '2016',  //Int32
 //            month: '2016-11',  //string
 //            day: '2016-12-19',  //string 
 //            minute: '2016-12-19 10:29'  //string 
 //        }, 
 //        senderName: 'weiqin',//string 发送消息的人员姓名 
 //        senderId: 'weixindeweiyiid',//string 发送消息的人员唯一Id
 //        senderImage: 'abcdef1234567890', //string 发送消息人员图片 
 //        status: 0, //bit，上墙状态 0 false 未上墙， 1 true 已上墙
 //        isDeleted: 0,//bit , 删除状态 0 false 未删除， 1 true 已删除
 //    }

function MessageRecord(messageRecord) {
	// this.recordId = messageRecord.recordId;
	this.msgType = messageRecord.msgType;
	this.msgContent = messageRecord.msgContent;	
	this.senderName = messageRecord.senderName;
	this.senderId = messageRecord.senderId;
	// this.status = messageRecord.status;
	// this.isDeleted = messageRecord.isDeleted;
}

module.exports = MessageRecord;

MessageRecord.prototype.save = function(callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year: date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    };

    //要存入数据库的文档
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

    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取messageRecord集合
        db.collection('messageRecords', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //为senderName属性添加索引
            collection.ensureIndex('senderName');
            //将文档插入messageRecords集合
            collection.insert(messageRecord, {safe: true}, function(err, messageRecord) {
                mongodb.close();
                callback(err, messageRecord);
            });
        });
    });
};