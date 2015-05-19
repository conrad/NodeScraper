var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');   
  // cheerio gives you server-side jQuery functionality

var app = express();

app.get('/scrape', function(req, res){

  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, statusCode, html){

    if (!error){
      // use cheerio on the returned html
      var $ = cheerio.load(html);
      // define variables to be used 
      var title, release, rating;
      var json = {
        title  : "",
        release: "",
        rating : ""
      };
    }
  });
});

app.listen('8081');
console.log('Listening on port 8081');

exports = module.exports = app;