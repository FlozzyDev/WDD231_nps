

export function parkBannerTemplate(parkData) {
    return `<a href="/" class="hero-banner__title">${parkData.name}</a>
    <p class="hero-banner__subtitle">
      <span>${parkData.designation}</span>
      <span>${parkData.states}</span>
    </p>`;
  }

export function mediaCardTemplate(data) {
        return `
        <div class="media-card">
          <a href="${data.link}">
            <img src="${data.image}" alt="${data.name}" class="media-card__img" />
            <h3 class="media-card__title">${data.name}</h3>
          </a>
          <p>${data.description}</p>
        </div>`;
  }

function getPhoneNumber(contacts) {
    const voiceNumber = contacts.phoneNumbers.find(phone => phone.type === "Voice");
    return voiceNumber;
  }

function getMailingAddress(addresses) {
    const mailingAddress = addresses.find(address => address.type === "Mailing");
    return mailingAddress;
  }

export function footerTemplate (parkData) {
    const phoneNumber = getPhoneNumber(parkData.contacts);
    const mailingAddress = getMailingAddress(parkData.addresses);
    const formattedAddress = `${mailingAddress.line1}, ${mailingAddress.city}, ${mailingAddress.stateCode} ${mailingAddress.postalCode}`;
    const formattedPhoneNumber = phoneNumber.phoneNumber;
 

    return `
    <div class="footer-info">
      <h3 class="footer-info__title">Contact Info</h3>
      <h4 id="address-title">Mailing Address:</h4>
      <p class="footer-info__mailing-address">${formattedAddress}</p>
      <h4 id="address-title">Phone:</h4>
      <p class="footer-info__phone-number">${formattedPhoneNumber}</p>
    </div>
    `
  }

