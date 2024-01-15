function inputUser(){
    let demo = document.getElementById('demo');
    demo.addEventListener('input',function(e){
        var value = e.target.value;
         Data(value)    
    }) 
}
inputUser()

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let LOCATION ;
let current ;
let forecast;
let cartona;
async function Data(locationYou){
   let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=062948ed5fb440fa954120011241301&q=${locationYou}&days=7`);
   let finalResponse = await response.json();
    LOCATION = finalResponse.location;
   current = finalResponse.current;
   forecast = finalResponse.forecast;
    displayData()
}

Data('cairo')
function displayData(){
    const day1 = new Date(`${forecast.forecastday[0].date}`);
    let dayToday = weekday[day1.getDay()];
    let month = months[day1.getMonth()];
    let dayM = day1.getDate() + month
    const day2 = new Date(`${forecast.forecastday[1].date}`);
    let dayTomorrow = weekday[day2.getDay()];
    const day3 = new Date(`${forecast.forecastday[2].date}`);
    let dayAfterTomorrow = weekday[day3.getDay()]

     cartona = ` <div class="card">
    <div class="card-header d-flex justify-content-between text-light">
        <div class="day">${dayToday}</div>
        <div class="date">${dayM}</div>
    </div>
    <div class="card-body">
        <h5 class="card-country">${LOCATION.name}</h5>
        <div class="info-data d-flex justify-content-between align-items-center">
            <div class="temp">
                ${current.temp_c}<sup>o</sup>C
            </div>
            <div class="icon"><img src="https:${current.condition.icon}"></div>
        </div>
        <div class="custom">${current.condition.text}</div>
        <span id='icon'><img src="./image/icon-umberella.png" alt="">20%</span>
        <span id='icon'><img src="./image/icon-wind.png" alt="">18km/h</span>
        <span id='icon'><img src="./image/icon-compass.png" alt="">East</span>
    </div>
  </div>
  <div class="card center text-center" >
  <div class="card-header text-light">
      <div class="day ">${dayTomorrow}</div>
  </div>
  <div class="card-body">
      <div class="icon mb-3"><img src="https:${forecast.forecastday[1].day.condition.icon}"></div>
      <div class="temp-max">
          ${forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C
     </div>
     <div class="temp-min">
     ${forecast.forecastday[1].day.mintemp_c}<sup>o</sup>
      </div>
      <div class="custom">${forecast.forecastday[1].day.condition.text}</div>
  </div>
</div>
<div class="card text-center" >
<div class="card-header text-light">
    <div class="day">${dayAfterTomorrow}</div>
</div>
<div class="card-body">
    <div class="icon mb-3"><img src="https:${forecast.forecastday[2].day.condition.icon}"></div>
    <div class="temp-max">
    ${forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C
   </div>
   <div class="temp-min">
   ${forecast.forecastday[2].day.mintemp_c}<sup>o</sup>
    </div>
    <div class="custom">${forecast.forecastday[2].day.condition.text}</div>
</div>
</div>`
  document.getElementById('cardData').innerHTML = cartona
}
