var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index');
var tasks = require('./routes/tasks');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//file routes

app.use('/tasks', tasks);

app.get('/', index);

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.use(express.static('./server/public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
