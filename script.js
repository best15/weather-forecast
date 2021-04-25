var cityname = document.querySelector("#cityname");
var temp = document.querySelector("#temp");
var windspeed = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uv_index = document.querySelector("#uv");
var fiveday_forecast = document.querySelector("#fiveday_forecast");
var search_city = document.querySelector("#searchcity");
var searchBtn = document.querySelector("#searchBtn");
var recentdiv = document.querySelector("#recentsearch");

var searchedlocation = new Array();


if (JSON.parse(localStorage.getItem("recentsearch")) != null)
{
  searchedlocation = JSON.parse(localStorage.getItem("recentsearch"));
  console.log(searchedlocation);
  for (let i = searchedlocation.length; i > 0 ; i--)
  {
  var recent = document.createElement("button");
    recent.setAttribute("class", "btn btn-secondary  col-12 mb-3")
    recentdiv.append(recent);
    recent.innerHTML = searchedlocation[i-1];
  }
}

var appid = "d168d3a7571fda5f948e93fcef34e556";
var lat = 33.44;
var long = -94.04;
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=imperial&appid=${appid}`
var date = moment().format("M/D/Y");

searchBtn.addEventListener("click" , weatherforecast);

function weatherforecast(event) {

  var address = search_city.value;
  var check = searchedlocation.includes(address) ;

  if (address!= null && !check){

    if(searchedlocation.length === 10){
      searchedlocation.slice(1);
    }
    searchedlocation.push(address);
    localStorage.setItem("recentsearch", JSON.stringify(searchedlocation));
  }

  searchedlocation = JSON.parse(localStorage.getItem("recentsearch"));
  recentdiv.innerHTML = '';
  
  for (let i = searchedlocation.length; i > 0 ; i--)
  { 
   
    console.log(searchedlocation,searchedlocation.length);
    var  recent = document.createElement("button");
    recent.setAttribute("class", "btn btn-secondary  col-12 mb-3")
    recent.innerHTML = searchedlocation[i-1];
    recentdiv.append(recent);
    
  }

}

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
 
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

    
    var next_day = document.createElement("h5");
    next_day.setAttribute("class", "text-white mb-3 mt-2");
    next_day.innerHTML = moment(date).add(i+1, 'd').format("M/D/Y")
    // console.log(moment(date).add(i+1, 'd').format("M/D/Y"));

    var temperature = document.createElement("h5");
    temperature.setAttribute("class", "text-white mb-3");
    temperature.innerHTML = "Temp: " + data.daily[i].temp.day + "°F";

    var wind = document.createElement("h5");
    wind.setAttribute("class", "text-white  mb-3");
    wind.innerHTML = "Wind: " + data.daily[i].wind_speed  + " MPH";

    var humid = document.createElement("h5");
    humid.setAttribute("class", "text-white  mb-3");
    humid.innerHTML = "Humidity: " + data.daily[i].humidity + "%";


    days.append(next_day,temperature,wind,humid);

    }


  });


  //https://maps.googleapis.com/maps/api/geocode/json?address=${}&key=AIzaSyDN1pX_tOXAc0E5aubEVhCiNuRh8eDTL3s

//   fetch('https://api.openweathermap.org/data/2.5/weather?q=perth&appid=d168d3a7571fda5f948e93fcef34e556')
//   .then(function (response) {
    
//     return response.json();
//   })
//   .then(function (data) {
//  console.log(data);
//   });