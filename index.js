var express = require('express');
var app = express();
//数据库mongodb使用
var mongoosejs = require('./db/mongoose');
mongoosejs.start(); //配置

var mongoose = require('mongoose');

var Trans = mongoose.model('Trans');

//某一个接口实现，包含数据库操作
app.get('/search/:key', function(req, res, next) {

  var _key = req.params.key;
  var cond = {
    key: {
      "$all": ["definition", _key]
    }
  };

  var trans = new Trans();
  Trans.find(cond, function(error, result) {
    if (!error) {
      res.json(result);
    } else {
      console.log(error);
    }
  });
});

app.listen(3000, function() {
  console.log("Server Running on http://localhost:3000");
});
