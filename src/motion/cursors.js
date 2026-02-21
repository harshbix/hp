import gsap from 'gsap';

export function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';

    const cursorText = document.createElement('span');
    cursorText.className = 'cursor-text';
    cursor.appendChild(cursorText);

    document.body.appendChild(cursor);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Quick initialize position if first move
        if (cursorX === 0 && cursorY === 0) {
            cursorX = mouseX;
            cursorY = mouseY;
            gsap.set(cursor, { x: mouseX, y: mouseY, opacity: 1 });
        }
    });

    // Smooth follow via requestAnimationFrame
    function renderCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        gsap.set(cursor, { x: cursorX, y: cursorY });
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Contextual Hover Logic
    const interactiveElements = document.querySelectorAll('a, button, input, select, .magnetic-btn');
    const projectCards = document.querySelectorAll('.project-card, .archive-btn');
    const heroSection = document.getElementById('hero');
    const contactSection = document.getElementById('contact');

    // Generic interactives (Scale down, clear text)
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-active');
            cursorText.innerText = '';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-active');
        });
    });

    // Project Gallery (Vibe: "View" text, expand)
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-view');
            cursorText.innerText = 'Explore';
        });
        card.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-view');
            cursorText.innerText = '';
        });
    });

    // Hero Section (Vibe: "Discover")
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-hero');
            if (!cursor.classList.contains('hover-active')) {
                cursorText.innerText = 'Drag';
            }
        });
        heroSection.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-hero');
            cursorText.innerText = '';
        });
    }

    // Contact / Water Section (Vibe: "Touch")
    if (contactSection) {
        contactSection.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-water');
            cursorText.innerText = 'Ripple';
        });
        contactSection.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-water');
            cursorText.innerText = '';
        });
    }
}
