var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pdf = require('html-pdf');

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

function createPDF() {
    var filename = 'bill-transporter-80-percent.html'
    var html = fs.readFileSync('./' + filename, 'utf8');
    var options = { format: 'Letter' };

    pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });

    // pdf.create(html, options).toStream(function (err, stream) {
    //     if (err) return console.log(err)
    //     uploadToS3(stream, filename)
    // });
}


app.get('/', function (re, res) {
    console.log('test====');
    res.json({ a: 1 });
    createPDF();
    res.end()
});

// Use environment defined port or 3000
var port = process.env.PORT || 8888;

// Start the server
app.listen(port);
console.log('Server starts on port ' + port);