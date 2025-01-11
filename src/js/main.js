import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function parkInfoTemplate(info) {
    return `
      <h1 id="park-name-title">${info.name}</h1>
      <p id="park-name-details">${info.designation}<br>${info.states}</p>
    `;
  }
  
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = parkData.url;
  disclaimer.innerHTML = parkData.fullName;
  
  document.title = parkData.fullName;
  
  const heroImage = document.querySelector("#park-hero-image img");
  heroImage.src = parkData.images[0].url;
  
  const parkNameSection = document.querySelector("#park-name");
  parkNameSection.innerHTML = parkInfoTemplate(parkData);