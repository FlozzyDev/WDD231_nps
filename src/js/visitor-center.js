import "../css/style.css";
import "../css/conditions.css";
import "../css/visitor-center.css";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.js";
import { setHeaderFooter } from "./setHeaderFooter.js";

function getParam(param) {
    const search = location.search;
    const params = new URLSearchParams(search);
    return params.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - starting initialization');
    init();
});

// Template functions
export function iconTemplate(iconId) {
    return `<svg class="icon" role="presentation" focusable="false">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="images/sprite.symbol.svg#${iconId}"></use>
    </svg>`;
}

export function vcTitleTemplate(text) {
    return `${iconTemplate("ranger-station")} ${text}`;
}

export function vcInfoTemplate(data) {
    const image = data.images?.[0];
    return `
        ${image ? `
            <figure>
                <img src="${image.url}" alt="${image.altText}" />
                <figcaption>${image.caption} <span>${image.credit}</span></figcaption>
            </figure>
        ` : ''}
        <p>${data.description}</p>`;
}

export function listTemplate(data, contentTemplate) {
    if (!data?.length) return '<p>No information available</p>';
    const html = data.map(contentTemplate);
    return `<ul>${html.join("")}</ul>`;
}

export function vcAddressTemplate(data) {
    return `
        <section class="vc-addresses__${data.type.toLowerCase()}">
            <h3>${data.type} Address</h3>
            <address>
                ${data.line1}<br />
                ${data.line2 ? `${data.line2}<br />` : ''}
                ${data.city}, ${data.stateCode} ${data.postalCode}
            </address>
        </section>`;
}

export function vcAddressesListTemplate(data) {
    if (!data?.length) return '<p>No address information available</p>';
    const physical = data.find(addr => addr.type === "Physical");
    const mailing = data.find(addr => addr.type === "Mailing");
    let html = physical ? vcAddressTemplate(physical) : '';
    if (mailing) {
        html += vcAddressTemplate(mailing);
    }
    return html;
}

export function vcAmenityTemplate(data) {
    return `<li>${data}</li>`;
}

export function vcDirectionsTemplate(data) {
    return `<p>${data}</p>`;
}

export function vcContactsTemplate(data) {
    if (!data?.contacts) return '<p>No contact information available</p>';
    
    const email = data.contacts.emailAddresses?.[0];
    const phone = data.contacts.phoneNumbers?.[0];
    
    return `
        ${email ? `
            <section class="vc-contact__email">
                <h3>Email Address</h3>
                <a href="mailto:${email.emailAddress}">${email.emailAddress}</a>
            </section>
        ` : ''}
        ${phone ? `
            <section class="vc-contact__phone">
                <h3>Phone Numbers</h3>
                <a href="tel:${phone.phoneNumber}">${phone.phoneNumber}${phone.description ? ` - ${phone.description}` : ''}</a>
            </section>
        ` : ''}`;
}

export function vcImageTemplate(data) {
    return `
        <li>
            <img src="${data.url}" alt="${data.altText}" />
            <figcaption>${data.caption} <span>${data.credit}</span></figcaption>
        </li>`;
}

export function detailsTemplate(id, iconId, summaryText, content) {
    return `
        <details name="vc-details" id="${id}">
            <summary>
                ${iconTemplate(iconId)}
                ${summaryText}
            </summary>
            ${content}
        </details>`;
}

async function init() {
    try {
        console.log('Initializing visitor center page...');
        
        const parkData = await getParkData();
        console.log('Retrieved park data:', { parkName: parkData.name, parkCode: parkData.parkCode });
        
        const centerId = getParam('id');
        console.log('Retrieved center ID from URL:', centerId);
        
        if (!centerId) {
            console.error('No visitor center ID provided in URL');
            return;
        }
        
        const center = await getParkVisitorCenterDetails(centerId);
        if (!center) {
            console.error('Visitor center not found:', centerId);
            return;
        }
        
        console.log('Setting header and footer...');
        setHeaderFooter(parkData);
        
        displayVisitorCenter(center);
        
        console.log('Page initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

function displayVisitorCenter(center) {
    const title = document.querySelector('.vc-name');
    if (title) {
        title.innerHTML = vcTitleTemplate(center.name);
    }

    const info = document.querySelector('.vc-info');
    if (info) {
        info.innerHTML = vcInfoTemplate(center);
    }

    const detailsEl = document.querySelector('.vc-details-list');
    if (detailsEl) {
        detailsEl.innerHTML = '';
        
        detailsEl.insertAdjacentHTML(
            'beforeend',
            detailsTemplate('vcAddresses', 'heading-icon_map-pin', 'Addresses', 
                vcAddressesListTemplate(center.addresses))
        );

        detailsEl.insertAdjacentHTML(
            'beforeend',
            detailsTemplate('vcDirections', 'directions', 'Directions',
                vcDirectionsTemplate(center.directionsInfo))
        );

        detailsEl.insertAdjacentHTML(
            'beforeend',
            detailsTemplate('vcAmenities', 'heading-icon_info', 'Amenities',
                listTemplate(center.amenities, vcAmenityTemplate))
        );
        detailsEl.insertAdjacentHTML(
            'beforeend',
            detailsTemplate('vcContact', 'phone', 'Contact Information',
                vcContactsTemplate(center))
        );
    }

    const gallery = document.querySelector('.vc-gallery');
    if (gallery && center.images?.length) {
        gallery.insertAdjacentHTML('beforeend', 
            listTemplate(center.images, vcImageTemplate)
        );
    }
} 