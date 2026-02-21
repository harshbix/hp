export function initRippleEffect() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    // Create canvas strictly for the contact section background
    const canvas = document.createElement('canvas');
    canvas.id = 'ripple-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3'; // Subtle watery essence

    // Make sure contact context allows absolute children
    contactSection.style.position = 'relative';
    contactSection.style.overflow = 'hidden';
    contactSection.insertBefore(canvas, contactSection.firstChild);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let width, height;
    let halfWidth, halfHeight;
    let size = 0;
    let map1, map2;
    let rippleMap = [];
    let lastMap = [];
    let texture;

    const RIPPLE_RADIUS = 3;

    // Create an offscreen canvas to act as our "background texture" to warp
    const textureCanvas = document.createElement('canvas');
    const tCtx = textureCanvas.getContext('2d', { willReadFrequently: true });

    function resize() {
        width = contactSection.offsetWidth;
        height = contactSection.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        textureCanvas.width = width;
        textureCanvas.height = height;

        halfWidth = width >> 1;
        halfHeight = height >> 1;
        size = width * (height + 2) * 2;

        rippleMap = new Int16Array(size);
        lastMap = new Int16Array(size);

        map1 = lastMap;
        map2 = rippleMap;

        // Draw something dark and moody to the texture canvas so we can displace it
        const gradient = tCtx.createRadialGradient(halfWidth, halfHeight, 0, halfWidth, halfHeight, Math.max(width, height));
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#050505');
        tCtx.fillStyle = gradient;
        tCtx.fillRect(0, 0, width, height);

        // Add some noise or grid for the water to warp visually
        tCtx.strokeStyle = 'rgba(255,255,255,0.08)';
        tCtx.lineWidth = 1;
        for (let i = 0; i < Math.max(width, height); i += 30) {
            tCtx.beginPath(); tCtx.moveTo(i, 0); tCtx.lineTo(i, height); tCtx.stroke();
            tCtx.beginPath(); tCtx.moveTo(0, i); tCtx.lineTo(width, i); tCtx.stroke();
        }

        texture = tCtx.getImageData(0, 0, width, height);
    }

    window.addEventListener('resize', resize);
    resize();

    let isMouseIn = false;

    contactSection.addEventListener('mousemove', (e) => {
        isMouseIn = true;
        const rect = contactSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        dropAt(mouseX, mouseY);
    });

    contactSection.addEventListener('mouseleave', () => {
        isMouseIn = false;
    });

    function dropAt(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        // Boundary check
        if (x < RIPPLE_RADIUS || x >= width - RIPPLE_RADIUS || y < RIPPLE_RADIUS || y >= height - RIPPLE_RADIUS) return;

        for (let j = y - RIPPLE_RADIUS; j < y + RIPPLE_RADIUS; j++) {
            for (let k = x - RIPPLE_RADIUS; k < x + RIPPLE_RADIUS; k++) {
                const index = j * width + k;
                if (index >= 0 && index < lastMap.length) {
                    map1[index] += 1024; // Water depth
                }
            }
        }
    }

    function render() {
        if (!width || !height) return requestAnimationFrame(render);

        // Auto drop occasionally if mouse isn't in to keep it alive
        if (!isMouseIn && Math.random() > 0.95) {
            dropAt(Math.random() * width, Math.random() * height);
        }

        const rippleData = ctx.getImageData(0, 0, width, height);
        const resultData = rippleData.data;
        const textureData = texture.data;

        // Ripple Math Optimization
        let i = width;
        let length = width * height - width;

        for (; i < length; i++) {
            // Wave propagation
            map2[i] = ((map1[i - 1] +
                map1[i + 1] +
                map1[i - width] +
                map1[i + width]) >> 1) - map2[i];

            // Damping
            map2[i] -= map2[i] >> 5;

            // Displace pixels based on depth data
            let data = map2[i];
            let offset = ((data - 1024) * 0.05) >> 0;

            let x = i % width;
            let y = i / width >> 0;

            // Reflection/Refraction lookups
            let tx = x + offset;
            let ty = y + offset;

            // Clamp to edges
            if (tx < 0) tx = 0; else if (tx >= width) tx = width - 1;
            if (ty < 0) ty = 0; else if (ty >= height) ty = height - 1;

            let textureIdx = (tx + (ty * width)) * 4;
            let resultIdx = i * 4;

            resultData[resultIdx] = textureData[textureIdx];
            resultData[resultIdx + 1] = textureData[textureIdx + 1];
            resultData[resultIdx + 2] = textureData[textureIdx + 2];
            resultData[resultIdx + 3] = 255;
        }

        // Swap buffers
        let temp = map1;
        map1 = map2;
        map2 = temp;

        ctx.putImageData(rippleData, 0, 0);
        requestAnimationFrame(render);
    }

    render();
}
