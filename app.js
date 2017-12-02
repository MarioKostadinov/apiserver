var express     = require('express');
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    app         = express(),
    fs          = require('fs'),
    privateKey  = fs.readFileSync('key.pem', 'utf8'),
    certificate = fs.readFileSync('cert.pem', 'utf8'),
    cred        = {key: privateKey, cert: certificate},
    http        = require('http'),
    https       = require('https');

var httpServer = http.createServer(app);
var httpsServer = https.createServer(cred, app);


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

app.post("/search", function(req, res){

    mongoose.connect("localhost", "cities");
    var cities = City.find({}, function(err, data){
        console.log(data);
    });

    var data = [
      {
        city: "Coventry",
        description: "Coventry Cathedral was built after the destruction of the 14th century cathedral church of Saint Michael by the Luftwaffe in the Coventry Blitz of 14 November 1940. Coventry motor companies have contributed significantly to the British motor industry. The city has two universities, Coventry University in the city centre and the University of Warwick on the southern outskirts."
      },
      {
        city: "London",
        description: "Capital city of the UK."
      }
    ];

    data.forEach(function(city){

      if(city.city === req.body.search){
        res.render("search", {data: city});
      }
    });



});


app.listen(3000, function(){
    // seedDB.deleteUsers();
    // seedDB.createUsers();
    // seedDB.generateSales();
    console.log("Server started!");
});
