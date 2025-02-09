import "../css/style.css";
import "../css/home.css";
import { getParkData, getParkInfoLinks } from "./parkService.js";
import { setHeaderFooter } from "./setHeaderFooter.js";
import { mediaCardTemplate } from "./templates.js";

function setIntroSection (parkData) {
  const introSection = document.querySelector("#main > .intro")
  introSection.innerHTML = `<h1>${parkData.fullName}</h1>
  <p>${parkData.description}</p>`;
}

function setInfoCards(infoLinks) {
  const container = document.querySelector(".info > .media-cards-container");
  container.innerHTML = infoLinks.map(mediaCardTemplate).join("");
}

async function init() {
  const parkData = await getParkData();
  const infoLinks = getParkInfoLinks(parkData.images);
  setInfoCards(infoLinks);
  setHeaderFooter(parkData);
  setIntroSection(parkData);
}

init();
