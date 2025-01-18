import { getParkData, getParkInfoLinks } from "./parkService.mjs";
import { setHeaderFooter } from "./setheaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

const infoLinks = getParkInfoLinks();
const parkData = getParkData();

function setIntroSection (parkData) {
  const introSection = document.querySelector("#main > .intro")
  introSection.innerHTML = `<h1>${parkData.fullName}</h1>
  <p>${parkData.description}</p>`;
}

function setInfoCards(infoLinks) {
  const container = document.querySelector(".info > .media-cards-container");
  container.innerHTML = infoLinks.map(mediaCardTemplate).join("");
}


setInfoCards(infoLinks);
setHeaderFooter(parkData);
setIntroSection(parkData);




