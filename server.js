var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');   
  // cheerio gives you server-side jQuery functionality

var app = express();

app.use(express.static(__dirname + '/public'))

// app.get('/', function(req, res){
//   app.serve(static(_dirname + '/', index.html));
// });

app.get('/scrape', function(req, res){

  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, statusCode, html){

    if (!error) {
      // use cheerio on the returned html
      var $ = cheerio.load(html);
      // define variables to be used 
      var title, release, rating;
      var json = {
        title  : "",
        release: "",
        rating : ""
      };

      // choose a unique element as a starting point
      $('.header').filter(function(){
        // store the data into a variable to easily see what's going on
        var data = $(this);

        // In examining the DOM we notice that the title rests within the first child element of the header tag. 
        json.title = data.children().first().text();
        // We see release date is located within the last element.
        json.release = data.children().last().children().text();

      });

    // movie rating is inside a different DOM element
      $('.star-box-giga-star').filter(function(){
        var data = $(this);
        json.rating = data.text();
      });
    }

    fs.writeFile('data/output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written - Check project directory for output.json');
    });

    fs.writeFile('allHTML.json', html, function(err){
      console.log('allHTML file successfully written');
    })

    res.send('Check your console!');  // reminder: no UI

  });
});

app.listen('8081');
console.log('Listening on port 8081');

exports = module.exports = app;