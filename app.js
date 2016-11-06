var express = require('express');
var localServer = express();
var remoteServer = express();

localServer.use(express.static('./'));

localServer.listen(8000, function() {
  console.log('localHTMLServer listening at 8000');
});

remoteServer.listen(8001, function() {
  console.log('remoteAPIServer listening at 8001');
});

localServer.all('/', function(req, res) {
  console.log('__dirname', __dirname);
  res.sendFile('index.html', { root: __dirname })
});

localServer.all('/api', function(req, res) {
  sendHeader(req, res);
});

remoteServer.all('/api', function(req, res) {
  sendHeader(req, res);
});

remoteServer.all('/api-cors', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  sendHeader(req, res);
});

remoteServer.all('/api-cors-method', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,HEAD,TRACE,PUT,DELETE,OPTIONS,CONNECT');
  sendHeader(req, res);
});

remoteServer.all('/api-cors-header', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,HEAD,TRACE,PUT,DELETE,OPTIONS,CONNECT');
  res.setHeader('Access-Control-Allow-Headers','content-type');
  sendHeader(req, res);
});

remoteServer.all('/api-cors-custom-header', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,HEAD,TRACE,PUT,DELETE,OPTIONS,CONNECT');
  res.setHeader('Access-Control-Allow-Headers','content-type,Hankonline');
  sendHeader(req, res);
});

function sendHeader(req ,res) {
  var text = '';
  for (var p in req.headers) {
    text += p + '== ' + req.headers[p];
    text += '<br>'
    console.log(p, '== ', req.headers[p]);
  }
  // text += 'Response Header<br>';
  // text += res;
  // for (var p in res) {
  //   text += p + ' === ' + p.toString();
  //   text += '<br>'
  //   console.log(p, ' === ', p.toString());
  // }
  res.send(text);
}
