var $ = require('jQuery');
var handlebars = require('handlebars');

var results;
var currencyCode;
var title;
var shopName;
var searchTopic = 'yarn';
var urlKey = 'https://api.etsy.com/v2/listings/active.js?api_key=0p6m9qyg9nb4v916y83787n2&keywords=';
var url;

$( '.search' ).on('click', function() {
  $('.category-list').empty();

  searchTopic = $('#search').val();
  startProgram();

});

function startProgram(){
  'use strict';
  url = urlKey + searchTopic + '&includes=Images,Shop';
  var source = $('#category-template').html();
  var template = handlebars.compile(source);
  function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  function logData(data) {
    var arrayData = data.results;
    arrayData.forEach(function(value, i, thisArray){
      var context = {
        image: thisArray[i].Images[0].url_fullxfull,
        currencyCode: thisArray[i].currency_code,
        itemPrice: thisArray[i].price,
        title: thisArray[i].title,
        shopName: thisArray[i].Shop.shop_name,
      };
      console.log(context);

      $('.category-list').append(template(context));
    });
  }
  fetchJSONP(url, logData);
};
startProgram();
