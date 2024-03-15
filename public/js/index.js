/**const menu = document.querySelector("#menu");
const close = document.querySelector("#close");
const nav =  document.querySelector(".nav");

menu.addEventListener("click", ()=>{
    nav.classList.toggle("reveal");
})
close.addEventListener("click",()=>{
  nav.classList.toggle("reveal");
})  */

const loaderBtn = document.querySelector(".btn");
const loader = document.querySelector(".loader-container");
loaderBtn.addEventListener("click", ()=>{
  
  loader.classList.add("active");
})
