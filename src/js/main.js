import "../css/style.css";
import "../css/home.css";
import { getParkData, getParkInfoLinks } from "./parkService.js";
import { setHeaderFooter } from "./setHeaderFooter.js";
import { mediaCardTemplate } from "./templates.js";

function setIntroSection (parkData) {
  const introSection = document.querySelector("#main > .intro");
  
  introSection.innerHTML = `<h1>${parkData.fullName}</h1>
  <p>${parkData.description}</p>`;
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
  document.querySelector(".global-nav").classList.toggle("show");
  if (target.tagName != "BUTTON") {
    target = target.closest("button");
  }

  if (document.querySelector(".global-nav").classList.contains("show")) {
    target.setAttribute("aria-expanded", true);
  } else {
    target.setAttribute("aria-expanded", false);
  }
  console.log("toggle");
  });
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
enableNavigation();
