//引入mongoose第三方库
var mongoose = require('mongoose');

//可以把Schema理解为表中对象的结构
var TransSchema = new mongoose.Schema({
    uri: String,
    hit: Number,
    key: [String],
    subKey: [String],
    strId: String,
    createTime: Date,
    tmp: [String]
});

//Trans可以理解为表名
mongoose.model('Trans', TransSchema);
