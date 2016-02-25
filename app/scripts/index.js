
var results;
var currencyCode;
var title;
var shopName;

(function(){
  'use strict';


var $ = require('jQuery');
var handlebars = require('handlebars');

console.log(handlebars);

var source   = $("#entry-template").html();
var template = handlebars.compile(source);
var url = "https://api.etsy.com/v2/listings/active.js?api_key=0p6m9qyg9nb4v916y83787n2&keywords=yarn&includes=Images,Shop";

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
  data.results.forEach(function(value, i, thisArray){
    var context = {
      currencyCode: thisArray[i].currency_code,
      title: thisArray[i].title,
      shopName: thisArray[i].Shop.shop_name,
    };
    $(".spacer").append(template(context));
  });
}
fetchJSONP(url, logData);

function updatePhotos(data){
  data.Images.forEach(function(value, i, thisArray){
    var etsyPhotos = $("#photos").html();
    $(".spacer").append(template(context));
  });
}

  var theTemplateScript = $("#etsy-images").html();
  var theTemplate = handlebars.compile(theTemplateScript);


}());
