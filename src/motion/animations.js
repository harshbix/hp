import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initializeAnimations() {
  // 1. Hero Zoom Transition (Scroll-linked)
  const heroContent = document.querySelector('.hero-content');
  const heroElement = document.getElementById('hero');
  const contentTrack = document.getElementById('content-track');

  if (heroElement && contentTrack) {
    gsap.to(heroElement, {
      scale: 1.25,
      y: '-25vh', // Adjusted for stronger typography effect
      filter: 'blur(4px)',
      opacity: 0.85,
      ease: 'none',
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Content scaling up to meet the hero
    gsap.fromTo(contentTrack,
      { scale: 1.08, opacity: 0.6, y: '10vh' },
      {
        scale: 1, opacity: 1, y: '0vh',
        ease: 'none',
        scrollTrigger: {
          trigger: heroElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Validation Glitch Matrix
    const validationText = document.querySelector('.validation-text');
    if (validationText) {
      gsap.to(validationText, {
        scrollTrigger: {
          trigger: '#validation',
          start: 'top 80%',
          once: true,
          onEnter: () => startGlitchShuffle(validationText)
        }
      });
    }

    // Philosophy Glass Panes Stagger
    const glassPanes = document.querySelectorAll('.glass-pane');
    if (glassPanes.length > 0) {
      gsap.from(glassPanes, { // Changed to gsap.from as they should start hidden/lower
        y: 20, // Start slightly below
        opacity: 0, // Start invisible
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.philosophy-grid',
          start: 'top 85%',
          once: true
        }
      });
    }

    // Contact Section Dropping Animation
  }

  // 2. Typography Glitch/Shuffle Reveal (Random Glyphs)
  const glitchTargets = document.querySelectorAll('.glitch-target');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        // Don't repeat on scroll back
        observer.unobserve(target);

        const originalText = target.getAttribute('data-original');
        const length = originalText.length;
        let iteration = 0;

        const interval = setInterval(() => {
          target.innerText = originalText
            .split('')
            .map((letter, index) => {
              if (index < iteration) return originalText[index];
              if (letter === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          if (iteration >= length) {
            clearInterval(interval);
            target.innerText = originalText;
          }

          iteration += 1 / 3; // Controls speed of resolution
        }, 30);
      }
    });
  }, { threshold: 0.5 });

  glitchTargets.forEach(target => {
    // Save original for the observer BEFORE splitting
    target.setAttribute('data-original', target.innerText);
    observer.observe(target);
  });

  // 3. Magnetic Button Logic
  initMagneticButton();

  // 4. Standard Text Node Splits (For non-glitch elements)
  const splitTexts = document.querySelectorAll('[data-split]');
  splitTexts.forEach(el => {
    new SplitType(el, { types: 'lines, words', lineClass: 'line', wordClass: 'word' });
  });

  // 2. Hero Orchestration
  // Find words specifically inside the hero section, but make sure they exist
  // We need to wait a tick for SplitType to finish constructing the DOM elements
  setTimeout(() => {
    const heroWords = document.querySelectorAll('#hero .word');
    const tl = gsap.timeline();

    if (heroWords.length > 0) {
      tl.to(heroWords, {
        y: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.1
      });
    }
  }, 50);

  const sections = document.querySelectorAll('.section:not(#hero)');
  sections.forEach(section => {
    const words = section.querySelectorAll('.word');
    if (words.length > 0) {
      gsap.to(words, {
        y: 0,
        stagger: 0.015,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        }
      });
    }
  });

  // 5. Gallery Parallax & Reveal
  const galleryImages = document.querySelectorAll('.project-image');
  galleryImages.forEach(img => {
    gsap.to(img, {
      y: '10%', // moves down as you scroll past
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

function initMagneticButton() {
  const wrap = document.getElementById('magnetic-btn-wrap');
  const btn = document.getElementById('magnetic-btn');
  const text = btn?.querySelector('.magnetic-text');

  if (!wrap || !btn || !text) return;

  // Initial scroll reveal delay for focal priority
  gsap.from(wrap, {
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 1.5, // 150ms+ after other elements settle
    ease: 'back.out(1.5)'
  });

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
    gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: 'power2.out' });
  });

  wrap.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    gsap.to(text, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  });
}
