const ADMIN_PASSWORD = 'change-me';
const ADMIN_API_URL = 'https://script.google.com/macros/s/AKfycbznlVk4hiodmlHvDTZd1Y1z02iaF-UKE_2fT9Y8g8iCuUU6InLLIVOyHT6xwVlzpvW6/exec'; // Google Apps Script web app URL.

const authStatus = document.getElementById('authStatus');
const adminPanel = document.getElementById('adminPanel');
const projectForm = document.getElementById('projectForm');
const responseBox = document.getElementById('response');

function lockAdmin() {
    authStatus.textContent = 'Access denied. Refresh to try again.';
    authStatus.style.borderColor = 'rgba(255, 80, 80, 0.35)';
    authStatus.style.background = 'rgba(255, 80, 80, 0.08)';
    adminPanel.classList.add('hidden');
}

function unlockAdmin() {
    authStatus.textContent = 'Authenticated. Use the form below to add a new project.';
    authStatus.style.borderColor = 'rgba(195, 178, 135, 0.18)';
    authStatus.style.background = 'rgba(195, 178, 135, 0.09)';
    adminPanel.classList.remove('hidden');
}

function showResponse(message, isError = false) {
    responseBox.textContent = message;
    responseBox.style.color = isError ? '#ffb5b5' : '#bce0fd';
}

function validateForm(title, category, file) {
    if (!title || !category || !file) {
        showResponse('Please complete every required field before submitting.', true);
        return false;
    }
    if (!['photography', 'films', 'designs'].includes(category)) {
        showResponse('Invalid category selected.', true);
        return false;
    }
    return true;
}

async function submitProject(event) {
    event.preventDefault();
    responseBox.textContent = '';

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    if (!validateForm(title, category, file)) {
        return;
    }

    if (!ADMIN_API_URL) {
        showResponse('No API endpoint configured. Set ADMIN_API_URL in js/admin.js to your Apps Script URL.', true);
        return;
    }

    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('file', file);

        showResponse('Uploading project…');

        const response = await fetch(ADMIN_API_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Request failed with ${response.status}`);
        }

        const result = await response.json();
        showResponse(result.message || 'Project submitted successfully.');
        projectForm.reset();
    } catch (error) {
        showResponse(`Submission failed: ${error.message}`, true);
        console.error('Admin panel submission error:', error);
    }
}

function authenticateAdmin() {
    const input = prompt('Enter admin password');
    if (!input || input !== ADMIN_PASSWORD) {
        lockAdmin();
        return;
    }
    unlockAdmin();
}

if (projectForm) {
    projectForm.addEventListener('submit', submitProject);
}

document.addEventListener('DOMContentLoaded', authenticateAdmin);
