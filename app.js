var express     = require('express');
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    app         = express(),
    fs          = require('fs'),
    // privateKey  = fs.readFileSync('key.pem', 'utf8'),
    // certificate = fs.readFileSync('cert.pem', 'utf8'),
    // cred        = {key: privateKey, cert: certificate},
    http        = require('http'),
    https       = require('https');

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(cred, app);

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var citySchema = new mongoose.Schema({
  city: String,
  description: String
});

var City = mongoose.model("City", citySchema);
// mongoose.connect("mongodb://mario:123456@10.5.5.10:27017/test_db");
// City.create(
//   {
//     city: "London",
//     description: "Captial city of the UK"
//   }, function(err, data) {
//   if (err){
//     console.log(err);
//   } else{
//     console.log("City created", data);
//   }
// }
// );
app.get('/', function(req, res){
  res.render('index');
});


app.get("/search", function(req, res){

    let query = req.query.search;

    mongoose.connect("localhost", "cities");
    var cities = City.find({}, function(err, data){
        data.forEach(function(city){
          if(query==city.city) {
             res.render('search', {data:city});
          }
        });
    });
});

httpServer.listen(8080, function(){
  console.log('listening on 8080 http');

});
