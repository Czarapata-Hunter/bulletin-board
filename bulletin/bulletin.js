/* Imports */
// check if signout link exists
import '../auth/user.js';
import { createBulletin } from '../fetch-utils.js';
import { uploadImage } from '../fetch-utils.js';
// Part A:

//Get Dom Elements
const postBulletin = document.getElementById('post-bulletin');
const addButton = postBulletin.querySelector('button');
const errorDisplay = document.getElementById('error-display');
const preview = document.getElementById('preview');
const imageInput = document.getElementById('image-input');
// State
let error = null;
// Events
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/placeholder.png';
    }
});

postBulletin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postBulletin);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `bulletins/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('avatars', imagePath, imageFile);
    const bulletin = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('choose-category'),
        contact: formData.get('contact'),
        image_url: url,
    };

    const response = await createBulletin(bulletin);
    error = response.error;
    addButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});
// Display Functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
