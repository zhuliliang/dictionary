
var mongoose = require('mongoose');
var model = require('./model');

var Key = mongoose.model('Key');

var key = new Key({
    name: "premium",
    hit: 100,
    createTime: new Date()
});

key.save(function (error, result) {
    if (!error) {
        console.log("Insert Success");
    }
    else {
        console.log("Insert Failed");
    }
});
