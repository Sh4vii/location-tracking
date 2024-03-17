   window.onload = function displayPicture(){
     fetch('/profile/dp')
     .then(response => {
     if (!response.ok) {
      throw new Error('Network response was not ok');
     }
     return response.json(); 
     })
     .then(data => {
     console.log(data); // Handle the response data
     
      const profile = document.querySelector('.mag'); 
     const tim = profile.style.backgroundImage = `url('../uploads/${data.profilePicture}')`; 
     })
     .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      });
   }
   
   function upload() { 
    const top = document.querySelector(".upload"); 
    const image = top.files[0]; 
    
    console.log(image);
  
    if (!image.type.includes("image")) { 
     return alert('Only images are allowed!'); 
    } 
  
    if (image.size > 5_000_000) { 
     return alert('Maximum upload is 10mb!'); 
    } 
    
    if (image) {
    const formData = new FormData();
    formData.append('image', image);

    fetch('/profile/dp', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Image uploaded:', data);
      // Handle successful upload
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  } else {
    console.error('No file selected');
  }
  
    const fileReader = new FileReader(); 
    fileReader.readAsDataURL(image); 
  
    const name = document.getElementById("image").files[0].name 
  
    fileReader.onload = (fileReaderEvent) => { 
      
      const displayPicture = {
        profilePicture : fileReader.result
      }
      
     const profile = document.querySelector('.mag'); 
     const tim = profile.style.backgroundImage = `url(${fileReader.result})`; 
   }}
  
   function dark(){ 
   document.getElementById('bod').style.backgroundColor='#1b1b1b'; 
   let full = document.getElementById('net'); 
   full.style.backgroundColor = '#1b1b1b'; 
    
    let head = document.getElementsByClassName('second'); 
   for (let i = 0; i < head.length; i++) { 
     head[i].style.color="white"; 
   } 
  
   let rop = document.getElementsByTagName('p'); 
   for (let i = 0; i < rop.length; i++) { 
     rop[i].style.color="white"; 
   } 
  
   let btn = document.getElementsByTagName('button'); 
   for (let i = 0; i < btn.length; i++) { 
     btn[i].style.backgroundColor = "white" 
     btn[i].style.color = "#1b1b1b" 
   } 
 }   
  
   function light (event){ 
   document.getElementById('bod').style.backgroundColor = 'white'; 
   let full = document.getElementById('net'); 
   full.style.backgroundColor = 'white'; 
   // full.addEventListener('click', jim); 
    
    let head = document.getElementsByClassName('second'); 
   for (let i = 0; i < head.length; i++) { 
     head[i].style.color="#1b1b1b"; 
   } 
  
   let rop = document.getElementsByTagName('p'); 
   for (let i = 0; i < rop.length; i++) { 
     rop[i].style.color="#1b1b1b"; 
   } 
  
   let btn = document.getElementsByTagName('button'); 
   for (let i = 0; i < btn.length; i++) { 
     btn[i].style.backgroundColor = "#1b1b1b" 
     btn[i].style.color = "white" 
   } 
 } 
