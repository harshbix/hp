import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWebGL } from './webgl/scene';
import { initializeAnimations } from './motion/animations';
import { renderProjects } from './data/portfolio';
import { initBookingOverlay } from './booking/booking';
import { initCustomCursor } from './motion/cursors';
import { initRippleEffect } from './webgl/ripple';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    lerp: 0.1, // Smoothness
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connecting Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

document.body.classList.add('loading');

// Initialize Architectural Modules
document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
    renderProjects();
    initBookingOverlay();
    initCustomCursor();
    initRippleEffect();

    const preloaderCounter = document.getElementById('preloader-counter');
    const preloader = document.getElementById('preloader');
    const app = document.getElementById('app');

    // Simulated Loading Sequence
    let loadProgress = { value: 0 };

    const tl = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('loading');
            initializeAnimations();
            preloader.style.display = 'none';
        }
    });

    // 1. Count up to 100%
    tl.to(loadProgress, {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
            if (preloaderCounter) {
                preloaderCounter.innerText = Math.floor(loadProgress.value) + '%';
            }
        }
    })
        // 2. Slide loader up and fade app in
        .to('.preloader-content', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '+=0.2')
        .to(preloader, { y: '-100%', duration: 1, ease: 'power4.inOut' }, '-=0.1')
        .to(app, { opacity: 1, duration: 1 }, '-=0.8');
});

console.log('Digital Gallery Architecture Initialized.');
