var co = require('co'),
    path = require('path');
var ejsExpand = require("../index.js")

co(function* () {
  var str = yield ejsExpand.expand(path.join(process.cwd(), process.argv[2]));
  console.log(str);
}).catch(function(err){
  console.log(err);
});

// Example usage:
// node --harmony bin/ejs-expand.js ../trovamoda/views/product/small/index.html
