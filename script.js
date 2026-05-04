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