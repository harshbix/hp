import gsap from 'gsap';

export function initBookingOverlay() {
    const overlay = document.getElementById('booking-overlay');
    const closeBtn = document.getElementById('close-booking');
    const footerBtn = document.getElementById('footer-book-btn');
    const magneticBtn = document.getElementById('magnetic-btn');
    const pricingBtns = document.querySelectorAll('.book-this-btn');
    const serviceSelect = document.getElementById('service');
    const form = document.getElementById('booking-form');

    if (!overlay || !form) return;

    // Open logic
    const openOverlay = (serviceText = null) => {
        if (serviceText && serviceSelect) {
            serviceSelect.value = serviceText;
        }
        overlay.classList.remove('hidden');
        // a slight delay to allow display block to register before opacity transition
        setTimeout(() => overlay.classList.add('active'), 10);
    };

    // Close logic
    const closeOverlay = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.classList.add('hidden'), 800);
    };

    // Triggers
    magneticBtn?.addEventListener('click', (e) => { e.preventDefault(); openOverlay(); });
    footerBtn?.addEventListener('click', (e) => { e.preventDefault(); openOverlay(); });

    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openOverlay(btn.getAttribute('data-service'));
        });
    });

    closeBtn?.addEventListener('click', closeOverlay);

    // Close on bg click
    overlay.querySelector('.booking-bg-blur')?.addEventListener('click', closeOverlay);

    // WhatsApp Submission form logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        const message = `Hello HP Graphics,\n\nI would like to commission a project.\n\n*Details:*\nService: ${service}\nPreferred Date: ${date}\nPreferred Time: ${time}\nName: ${name}\nPhone: ${phone}\n\nSource: Website Booking`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/255628818312?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        closeOverlay();
        form.reset();
    });
}
