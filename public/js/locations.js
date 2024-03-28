

// Loader
const loaderBtn = document.querySelectorAll(".btn");
const loader = document.querySelector(".loader-container");
loaderBtn.forEach((btn) =>{
  btn.addEventListener("click", ()=>{
  loader.classList.add("active");
})
})

const latitude = document.getElementById('lat');
const longitude = document.getElementById('lon');

//leaflet js map 
  let map = L.map('map');
  map.setView([latitude, longitude], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker, circle, zoomed;

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
  
}






