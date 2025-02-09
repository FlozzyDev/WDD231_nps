import "../css/style.css";
import "../css/conditions.css";
import { getParkData, getParkAlerts, getParkVisitorCenters } from "./parkService.mjs";
import { setHeaderFooter } from "./setHeaderFooter.mjs";
import { activityListTemplate, alertTemplate, visitorCenterTemplate } from "./templates.mjs";

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - starting initialization');
  init();
});

function setAlerts(alerts) {
  console.log('Setting alerts...', { numberOfAlerts: alerts.length });
  const alertsContainer = document.querySelector(".alerts > ul"); 
  if (!alertsContainer) {
    console.error('Alert container not found: .alerts > ul');
    return;
  }
  alertsContainer.innerHTML = "";
  const html = alerts.map(alertTemplate);
  console.log('Generated alert HTML elements:', html.length);
  alertsContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setVisitorCenters(centers) {
  console.log('Setting visitor centers...', { numberOfCenters: centers.length });
  
  const visitorSection = document.querySelector(".visitor");
  console.log('Found visitor section:', !!visitorSection);
  
  const details = visitorSection?.querySelector("details");
  console.log('Found details element:', !!details);
  
  const ul = details?.querySelector("ul");
  console.log('Found ul element:', !!ul);
  
  const centersContainer = document.querySelector(".visitor details ul"); 
  console.log('Found with combined selector:', !!centersContainer);
  
  if (!centersContainer) {
      console.error('Visitor centers container not found: .visitor details ul');
      return;
  }
  centersContainer.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  console.log('Generated visitor center HTML elements:', html.length);
  centersContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setActivities(activities) {
  console.log('Setting activities...', { numberOfActivities: activities.length });
  const activityContainer = document.querySelector(".activities details ul");
  if (!activityContainer) {
    console.error('Activities container not found: .activities details ul');
    return;
  }
  activityContainer.innerHTML = "";
  const html = activityListTemplate(activities);  
  console.log('Generated activities HTML');
  activityContainer.insertAdjacentHTML("afterbegin", html);
}

async function init() {
    try {
        console.log('Initializing conditions page...');
        
        const parkData = await getParkData();
        console.log('Retrieved park data:', { 
            parkName: parkData.name,
            parkCode: parkData.parkCode 
        });

        const parkCode = parkData.parkCode;
        console.log('Fetching alerts and visitor centers for park code:', parkCode);
        
        const alerts = await getParkAlerts(parkCode);
        console.log('Retrieved alerts:', { count: alerts.length });
        
        const visitorCenters = await getParkVisitorCenters(parkCode);
        console.log('Retrieved visitor centers:', { count: visitorCenters.length });

        console.log('Setting header and footer...');
        setHeaderFooter(parkData);
        
        console.log('Populating page sections...');
        setAlerts(alerts);
        setVisitorCenters(visitorCenters);
        setActivities(parkData.activities);
        
        console.log('Page initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}
