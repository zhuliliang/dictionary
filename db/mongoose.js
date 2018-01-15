//引入mongoose模块
var mongoose = require('mongoose');
//引入上面实现的config.js
var config = require('./config');

//实现一个start()函数
module.exports.start = function () {
    //创建一个连接数据库的实例
    var db = mongoose.connect(config.mongodb, {useMongoClient: true});
    require('./model');
    return db;
};
