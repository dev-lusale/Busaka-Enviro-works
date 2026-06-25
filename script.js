// Initialize the map
const map = L.map('map').setView([-12.8468, 28.2120], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([-12.8468, 28.2120]).addTo(map)
    .bindPopup('Busaka Enviroworks HQ')
    .openPopup();

// Hamburger menu — declared first so scroll listeners can reference it
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        closeMenu();
    }
});

// Smooth scrolling — closes menu on nav link tap
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70; // account for fixed navbar height
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Contact form — async submission via Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';

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
            formStatus.textContent = 'Unable to send. Email us at busakaenviroworks@gmail.com.';
            formStatus.style.color = '#e05c5c';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
        }
    });
}

// Register service worker for PWA offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.warn('SW registration failed:', err));
    });
}
