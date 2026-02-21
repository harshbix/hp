export const portfolioData = {
    about: {
        name: "Henry Peter",
        brand: "HP Graphics",
        role: "Visual Identity Architect",
        skills: ["Brand Symbol Engineering", "Campaign Visual Systems", "Image Refinement & Narrative Retouch"],
        contact: {
            email: "hphenrypeter12@gmail.com",
            phone: "+255 628 818 312"
        },
        metrics: "10+ High Quality Projects Completed"
    },
    projects: [
        {
            id: "p1",
            title: "REVUELE Product Campaign",
            category: "Commercial Retouching",
            image: "/images/WhatsApp Image 2026-02-20 at 04.00.51.jpeg",
            strength: 9.5
        },
        {
            id: "p2",
            title: "Athlete Editorial",
            category: "Photo Manipulation",
            image: "/images/WhatsApp Image 2026-02-20 at 04.00.50.jpeg",
            strength: 9.2
        },
        {
            id: "p3",
            title: "City Massage Identity",
            category: "Brand Collateral",
            image: "/images/WhatsApp Image 2026-02-20 at 04.00.48.jpeg",
            strength: 9.0
        },
        {
            id: "p4",
            title: "Zamu Yangu Cover Art",
            category: "Cinematic Composition",
            image: "/images/WhatsApp Image 2026-02-20 at 03.58.30.jpeg",
            strength: 8.8
        },
        {
            id: "p5",
            title: "Corporate Drone Render",
            category: "3D & Motion Graphics",
            image: "/images/WhatsApp Image 2026-02-20 at 04.00.49 (1).jpeg",
            strength: 8.5
        }
    ]
};

export function renderProjects() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    // Use a subset of works for the main "Selected Works" to keep it curated
    const curatedProjects = portfolioData.projects.slice(0, 4);

    gallery.innerHTML = curatedProjects.map(project => `
        <div class="project-card">
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" />
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
            </div>
        </div>
    `).join('');

    renderArchive();
}

export function renderArchive() {
    const archiveGrid = document.querySelector('.archive-grid');
    if (!archiveGrid) return;

    // We use the full array for the extended archive overlay 
    // + add the remaining un-listed images found in the directory
    const fullArchiveImages = [
        ...portfolioData.projects.map(p => p.image),
        '/images/WhatsApp Image 2026-02-20 at 03.58.30.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.45.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.48.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.49 (1).jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.49.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.50 (1).jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.50.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.51.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.56.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.58 (1).jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.58 (2).jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.58.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.59 (1).jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.59 (2).jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.00.59.jpeg',
        '/images/WhatsApp Image 2026-02-20 at 04.01.01.jpeg',
        '/images/hero-img.jpeg'
    ];

    // Ensure uniqueness, map to HTML
    const uniqueImages = [...new Set(fullArchiveImages)];

    archiveGrid.innerHTML = uniqueImages.map((src, idx) => `
        <div class="archive-item" style="cursor: pointer; overflow: hidden; border-radius: 4px;">
            <div style="background-image: url('${src}'); background-size: cover; background-position: center; aspect-ratio: 1; margin-bottom: 1rem; transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); border: 1px solid rgba(255,255,255,0.05);" class="archive-thumbnail"></div>
            <p style="font-size: 14px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.05em;">Archive / ${String(idx + 1).padStart(3, '0')}</p>
        </div>
    `).join('');

    // Add simple hover effect logic
    const items = archiveGrid.querySelectorAll('.archive-item');
    items.forEach(item => {
        const bg = item.querySelector('.archive-thumbnail');
        item.addEventListener('mouseenter', () => bg.style.transform = 'scale(1.05)');
        item.addEventListener('mouseleave', () => bg.style.transform = 'scale(1)');
    });
}
