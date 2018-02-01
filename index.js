var express = require('express');
var cors = require('cors')

var serveStatic = require('serve-static');

var app = express();
app.use(cors())
//数据库mongodb使用
var mongoosejs = require('./db/mongoose');
mongoosejs.start(); //配置

var mongoose = require('mongoose');

var Trans = mongoose.model('Trans');

//某一个接口实现，包含数据库操作
app.get('/api/search/:key', function(req, res, next) {

  var _key = req.params.key;
  var cond = {
    key: {
      "$all": [decodeURIComponent(_key)]
    }
  };
  var projection = { _id: 0, key: 1, uri: 1, tmp:1};

  Trans.find(cond, projection, function(error, result) {
    if (!error) {
      //console.log(result);
      newresult = result.map(record => {
        // var newRecord = Object.assign({}, record, {cn: record.tmp[0], en: record.tmp[1]});
        var newRecord = record._doc;
        newRecord.cn = record.tmp[0];
        newRecord.en = record.tmp[1];
        return newRecord;
      })
      //console.log(newresult);
      res.json(newresult);
    } else {
      console.log(error);
    }
  });
});

//某一个接口实现，包含数据库操作
app.get('/api/keywords', function(req, res, next) {

  var cond = { };

  var projection = { _id: 0, key: 1 };

  var trans = new Trans();
  Trans.find(cond, projection, function(error, result) {
    if (!error) {
      var r = [];
      result.map((x) => {
        x['key'].map((y) => {
          r.push(y);
        })
        return r;
      })
      res.json(Array.from(new Set(r)));
    } else {
      console.log(error);
    }
  });
});


app.use('/', serveStatic(__dirname + '/_site'));


app.listen(30003, function() {
  console.log("Server Running on http://localhost:30003");
});
