/**const menu = document.querySelector("#menu");
const close = document.querySelector("#close");
const nav =  document.querySelector(".nav");

menu.addEventListener("click", ()=>{
    nav.classList.toggle("reveal");
})
close.addEventListener("click",()=>{
  nav.classList.toggle("reveal");
}) **/

// Loader
const loaderBtn = document.querySelectorAll(".btn");
const loader = document.querySelector(".loader-container");
loaderBtn.forEach((btn) =>{
  btn.addEventListener("click", ()=>{
  loader.classList.add("active");
})
})

//leaflet js map 
  let map = L.map('map');
  map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Native js geolocation api
let latitude, longitude;
let setLatitude = 0; 
let setLongitude = 0;

navigator.geolocation.watchPosition(successful, error);
let marker, circle, zoomed;

function successful(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;
  
  if(marker){
    map.removeLayer(marker);
    map.removeLayer(circle);
  }
  
  marker = L.marker([latitude, longitude]).addTo(map);
  circle = L.circle([latitude, longitude], {
    radius: 150
  }).addTo(map);
  
  if(!zoomed){
     zoomed = map.fitBounds(circle.getBounds());
  }
  map.setView([latitude, longitude]);
  
  getCurrentAddress(latitude, longitude);
  
  sendLocationToServer(latitude, longitude);
  
}

function error(){
  if(error.code === 1){
    alert("Please allow geolocation access");
  }else{
    alert("cannot get user location");
  }
}

function getCurrentAddress(latitude, longitude){
  
  const myLocation = document.querySelector("#current-position");
    
    let requestOptions = {
  method: 'GET',
};

let result;
fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=3578b9bf8c6c4054883fc9330eccc2c7`, requestOptions)
  .then(response => response.json())
  .then(result => {
  let resultPath = result.features[0].properties;
  let address = `${resultPath.address_line1} ${resultPath.address_line2}`
  myLocation.innerHTML = address;
  })
  .catch(error => console.log('error', error));
  
  const lat = document.getElementById("lat");
  const lon = document.getElementById("lon");
  
  lat.innerHTML = `Latitude: ${latitude}`;
  lon.innerHTML = `Longitude: ${longitude}`;

}

function sendLocationToServer(latitude, longitude){
  
  console.log({setLatitude, setLongitude, latitude, longitude});
  const roundedLatitude = Math.round(latitude, 3);
  const roundedLongitude = Math.round(longitude, 3);
  
  console.log(roundedLatitude, roundedLongitude)
  
  if(setLatitude != roundedLatitude || setLongitude != roundedLongitude){
    
    const newLocation = {
      latitude: latitude,
      longitude: longitude,
      date:  Date.now()
    }
    
    setLatitude = roundedLatitude;
    setLongitude = roundedLongitude;
    
fetch('/dashboard', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newLocation)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('POST request successful:', data);
})
.catch(error => {
  console.error('There was a problem with the POST request:', error);
});

  }else{
    return
  }
}





