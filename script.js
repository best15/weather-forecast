var cardtext = document.querySelector("#cardtext");

var appid = "d168d3a7571fda5f948e93fcef34e556";
var cityname = "sydney";

fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityname + '&exclude=minutely&units=imperial&appid=' + appid)
  .then(function (response) {
    
    return response.json();
  })
  .then(function (data) {
 console.log(data);
  });
