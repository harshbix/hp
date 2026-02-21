import gsap from 'gsap';

export function initBookingOverlay() {
    const overlay = document.getElementById('booking-overlay');
    const closeBtn = document.getElementById('close-booking');
    const footerBtn = document.getElementById('footer-book-btn');
    const magneticBtn = document.getElementById('magnetic-btn');
    const pricingBtns = document.querySelectorAll('.book-this-btn:not(#open-archive)');
    const serviceSelect = document.getElementById('service');
    const form = document.getElementById('booking-form');

    // Archive Elements
    const archiveOverlay = document.getElementById('archive-overlay');
    const openArchiveBtn = document.getElementById('open-archive');
    const closeArchiveBtn = document.getElementById('close-archive');

    // Open logic (generic)
    const openModal = (modalNode) => {
        if (!modalNode) return;
        modalNode.classList.remove('hidden');
        setTimeout(() => modalNode.classList.add('active'), 10);
    };

    // Close logic (generic)
    const closeModal = (modalNode) => {
        if (!modalNode) return;
        modalNode.classList.remove('active');
        setTimeout(() => modalNode.classList.add('hidden'), 800);
    };

    // Booking Triggers
    if (overlay) {
        const openBooking = (serviceText = null) => {
            if (serviceText && serviceSelect) serviceSelect.value = serviceText;
            openModal(overlay);
        };

        magneticBtn?.addEventListener('click', (e) => { e.preventDefault(); openBooking(); });
        footerBtn?.addEventListener('click', (e) => { e.preventDefault(); openBooking(); });

        pricingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openBooking(btn.getAttribute('data-service'));
            });
        });

        closeBtn?.addEventListener('click', () => closeModal(overlay));
        overlay.querySelector('.booking-bg-blur')?.addEventListener('click', () => closeModal(overlay));
    }

    // Archive Triggers
    if (archiveOverlay) {
        openArchiveBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal(archiveOverlay); });
        closeArchiveBtn?.addEventListener('click', () => closeModal(archiveOverlay));
        archiveOverlay.querySelector('.booking-bg-blur')?.addEventListener('click', () => closeModal(archiveOverlay));
    }

    // WhatsApp Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.submit-booking-btn');
            const btnText = submitBtn.querySelector('.btn-text');

            if (submitBtn.classList.contains('is-loading') || submitBtn.classList.contains('is-success')) return;

            // Loading State
            submitBtn.classList.add('is-loading');
            const originalText = btnText.innerText;
            btnText.innerText = 'Generating Protocol...';

            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            const message = `Hello HP Graphics,\n\nI would like to commission a project.\n\n*Details:*\nService: ${service}\nPreferred Date: ${date}\nPreferred Time: ${time}\nName: ${name}\nPhone: ${phone}\n\nSource: Website Booking`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/255628818312?text=${encodedMessage}`;

            // Simulate Network / Processing Delay
            setTimeout(() => {
                // Success State
                submitBtn.classList.remove('is-loading');
                submitBtn.classList.add('is-success');
                btnText.innerText = 'Success!';

                // Fire Redirect and Reset
                setTimeout(() => {
                    window.location.href = whatsappUrl;
                    closeModal(overlay);

                    // Reset Form and Button after hidden
                    setTimeout(() => {
                        form.reset();
                        submitBtn.classList.remove('is-success');
                        btnText.innerText = originalText;
                    }, 800);
                }, 600);
            }, 1200);
        });
    }
}
