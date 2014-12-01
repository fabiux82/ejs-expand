var ejsExpand = exports;

var fs = require('fs'),
    thunkify = require('thunkify'),
    co = require('co'),
    path = require('path');

var read = thunkify(fs.readFile);

var forEach = function*(l,f){
  for (var i=0;i<l.length;i++){
    var v = l[i];
    yield f(v);
  }
};

var expand = function*(fileName){
  //console.log(fileName);
  var str = yield read(fileName);
  str = str.toString();
  var includes = str.match(/<% *include *([^ ]+) *%>/g);
  if(!includes){
    includes = [];
  }
  yield forEach(includes,function*(include){
    var name = include.split(" ")[2];
    var pathFile = path.join(path.dirname(fileName),name);    
    var includeStr = yield expand(pathFile);
    str = str.replace(include,includeStr);
  });  
  return str;
};
ejsExpand.expand = expand;
