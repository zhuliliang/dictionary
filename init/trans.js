var lines = require('fs').readFileSync(__dirname + '/trans.txt', 'utf-8').split('\n').filter(Boolean);

console.log(lines[1].split(';')[0]);

var mongoose = require('mongoose');
var model = require('./model');

var Trans = mongoose.model('Trans');

lines.map(function(elem) {
  var uri = elem.split(';')[0];
  var type = uri.split('.')[1];
  var key = [];
  var subKey = [];
  var strId = '';
  if (type === 'definitions') {
    key.push('definition');
    //push description 之前那个
    key.push(uri.split('.')[uri.split('.').length-2]);
    key.push(uri.split('.')[uri.split('.').length-4]);
    subKey = uri.split('.');
    strId = uri.split('.')[uri.split('.').length-4] + '.' + uri.split('.')[uri.split('.').length-2];
  } else {
    //path
    key.push('path');
    key.push(type.substring(7, type.length-2));
    strId = type.substring(7, type.length-2)

  }
  trans = new Trans({
    uri: elem.split(';')[0],
    hit: 100,
    key: key,
    subKey: subKey,
    strId: strId,
    createTime: new Date(),
    tmp: [
      elem.split(';')[1],
      elem.split(';')[2]
    ]
  });
  trans.save(function(error, result) {
    if (!error) {
      console.log("Insert Success");
    } else {
      console.log("Insert Failed");
    }
  });
})
