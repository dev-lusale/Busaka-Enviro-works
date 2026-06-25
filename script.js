// Initialize the map
const map = L.map('map').setView([-12.8468, 28.2120], 13); // Centered on Kitwe/Copperbelt area by default

// Add a professional dark-themed tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a custom marker for the headquarters
const marker = L.marker([-12.8468, 28.2120]).addTo(map)
    .bindPopup('Busaka Enviroworks HQ')
    .openPopup();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form — async submission via Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = '';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = 'Your inquiry has been sent. We will be in touch shortly.';
                formStatus.style.color = '#c5a059';
                contactForm.reset();
            } else {
                const data = await response.json();
                const errorMsg = data.errors
                    ? data.errors.map(err => err.message).join(', ')
                    : 'Something went wrong. Please try again or email us directly.';
                formStatus.textContent = errorMsg;
                formStatus.style.color = '#e05c5c';
            }
        } catch {
            formStatus.textContent = 'Unable to send message. Please email us at busakaenviroworks@gmail.com.';
            formStatus.style.color = '#e05c5c';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
        }
    });
}
