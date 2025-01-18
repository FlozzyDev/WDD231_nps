import { parkBannerTemplate, footerTemplate } from "./templates.mjs";

function setHeaderInfo (parkData) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = parkData.url;
  disclaimer.innerHTML = parkData.fullName;
  document.querySelector("head > title").textContent = parkData.fullName;
  document.querySelector(".hero-banner > img").src = parkData.images[0].url;
  document.querySelector(".hero-banner__content").innerHTML =
    parkBannerTemplate(parkData);
  }

function setFooter(parkData) {
    const footer = document.querySelector(".park-footer");
    footer.innerHTML = footerTemplate(parkData);
}

export function setHeaderFooter(parkData) {
    setHeaderInfo(parkData);
    setFooter(parkData);
  }
