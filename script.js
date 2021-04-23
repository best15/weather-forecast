var cityname = document.querySelector("#cityname");
var temp = document.querySelector("#temp");
var windspeed = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uv_index = document.querySelector("#uv");
var fiveday_forecast = document.querySelector("#fiveday_forecast");

var appid = "d168d3a7571fda5f948e93fcef34e556";
var lati = 33.44;
var longi = -94.04;
var date = moment().format("M/D/Y");

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lati +'&lon=' + longi +'&exclude=minutely&units=imperial&appid=' + appid)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
 console.log(data);
 console.log(data.timezone);
    cityname.innerHTML = data.timezone + ' (' + date + ') ';
    temp.innerHTML = "Temp: " + data.current.temp + "°F";
    windspeed.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
    humidity.innerHTML = "Humidity: " + data.current.humidity + "%";
    uv_index.innerHTML = "UV Index: " + data.current.uvi;
    

    for (let i=0; i<data.daily.length-3; i++)
    {
    
    var days = document.createElement("div");
    days.setAttribute("class", "card col-sm-10 col-md-5 col-lg-2 bg-secondary mr-3 ");
    fiveday_forecast.append(days);  

    
    var next_day = document.createElement("h6");
    next_day.setAttribute("class", "text-white mb-3 mt-2");
    next_day.innerHTML = moment(date).add(i+1, 'd').format("M/D/Y")
    // console.log(moment(date).add(i+1, 'd').format("M/D/Y"));

    var temperature = document.createElement("h6");
    temperature.setAttribute("class", "text-white mb-3");
    temperature.innerHTML = "Temp: " + data.daily[i].temp.day + "°F";

    var wind = document.createElement("h6");
    wind.setAttribute("class", "text-white  mb-3");
    wind.innerHTML = "Wind: " + data.daily[i].wind_speed  + " MPH";

    var humid = document.createElement("h6");
    humid.setAttribute("class", "text-white  mb-3");
    humid.innerHTML = "Humidity: " + data.daily[i].humidity + "%";


    days.append(next_day,temperature,wind,humid);

    }


  });




//   fetch('http://maps.googleapis.com/maps/api/geocode/json?address=london' + appid)
//   .then(function (response) {
    
//     return response.json();
//   })
//   .then(function (data) {
//  console.log(data);
//   });