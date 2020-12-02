let timer;
let deletePhotoDelay;

async function start() {
   try {
       const response = await fetch("https://dog.ceo/api/breeds/list/all");
       console.log(response);
       const data = await response.json();
       breedList(data.message);
   } catch (error) {
       console.log('OOPS PROBLEM FETCHING BREED LIST😿')
   }
}

start();

function breedList(dogList) {
   document.getElementById("breed").innerHTML = `
        <select onchange='loadByBreed(this.value)'>
            <option>&#xa7;elect dog breed</option>
            ${Object.keys(dogList)
               .map(function (dog) {
                  return `<option>${dog}</option>`;
               })
               .join("")}
        </select>`;
}

async function loadByBreed(value) {
   if (value != "choose dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${value}/images`);
      const data = await response.json();
      createSlide(data.message);
   }
}

function createSlide(images) {
   let currentPos = 0;
   clearInterval(timer);
   clearTimeout(deletePhotoDelay);
   //* ---------------[ if breed have only 1 image ]-----------

   if (images.length > 1) {
      document.getElementById("slide").innerHTML = `
         <div class="slide" style="background-image: url('${images[0]}');"></div>
         <div class="slide" style="background-image: url('${images[1]}');"></div>`;

      currentPos += 2;
      //    ? ---[ if image has exactly 2 images][ evertime checks for length = 2 ]---
      if (images.length == 2) currentPos = 0;
      //    ?-----------------------------------------------------
      timer = setInterval(slider, 3000);
   } else {
      //    *----------[ condition for 1 image ]--------------
      document.getElementById("slide").innerHTML = `
         <div class="slide" style="background-image: url('${images[0]}');"></div>
         <div class="slide"></div>`;
   }

   //* -------------------------------------------------

   function slider() {
      document
         .getElementById("slide")
         .insertAdjacentHTML(
            "beforeend",
            `<div class="slide" style="background-image: url('${images[currentPos]}');"></div>`
         );
      deletePhotoDelay = setTimeout(() => {
         document.querySelector(".slide").remove();
      }, 1000);
      // if else used to handle limatitaion of images so to reset
      if (currentPos + 1 >= images.length) {
         // reset timer
         currentPos = 0;
      } else {
         currentPos++;
      }
   }
}
