import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWebGL } from './webgl/scene';
import { initializeAnimations } from './motion/animations';
import { renderProjects } from './data/portfolio';
import { initBookingOverlay } from './booking/booking';

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

// Initialize Architectural Modules
document.addEventListener('DOMContentLoaded', () => {
    initWebGL();
    renderProjects();
    initBookingOverlay();

    // Slight delay for animations to ensure DOM is ready
    setTimeout(() => {
        initializeAnimations();
    }, 100);
});

console.log('Digital Gallery Architecture Initialized.');
