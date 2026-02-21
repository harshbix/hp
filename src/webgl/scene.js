import * as THREE from 'three';

let scene, camera, renderer, particles;
let mouseX = 0;
let mouseY = 0;

export function initWebGL() {
    const container = document.getElementById('webgl-container');
    if (!container) return;

    scene = new THREE.Scene();
    // Very subtle radial black fog is handled in CSS, but we can add depth feel here

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    createParticles();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1200; // Increased count for volume
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 80;   // x spread
        posArray[i + 1] = (Math.random() - 0.5) * 80; // y spread
        posArray[i + 2] = (Math.random() - 0.5) * 40; // z spread (deeper)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Cinematic Dust Material
    const material = new THREE.PointsMaterial({
        size: 0.08, // slightly larger
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (particles) {
        // Continuous cinematic drift (falling dust)
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
        particles.position.y -= 0.005;

        // Reset position if drifting too far down
        if (particles.position.y < -10) {
            particles.position.y = 10;
        }

        // Heavy elastic drag based on mouse
        particles.rotation.y += (mouseX - particles.rotation.y) * 0.02;
        particles.rotation.x += (mouseY - particles.rotation.x) * 0.02;
    }

    renderer.render(scene, camera);
}
