/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderBulletin } from './render-utils.js';
import { getBulletins } from './fetch-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const bulletinList = document.getElementById('bulletin-list');

/* State */
let error = null;
let bulletins = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getBulletins();
    error = response.error;
    bulletins = response.data;

    if (error) {
        displayError();
    } else {
        displayBulletins();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayBulletins() {
    bulletinList.innerHTML = '';

    for (const bulletin of bulletins) {
        const bulletinEl = renderBulletin(bulletin);
        bulletinList.append(bulletinEl);
    }
}
