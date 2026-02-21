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
            id: 1,
            title: "Overspeed Security Identity",
            category: "Brand Identity",
            image: "/WhatsApp Image 2026-02-20 at 04.00.59.jpeg",
            strength: 9.5
        },
        {
            id: 2,
            title: "Recan Foundation Campaign",
            category: "Campaign Design",
            image: "/WhatsApp Image 2026-02-20 at 04.01.01.jpeg",
            strength: 9.0
        },
        {
            id: 3,
            title: "Modern Lifestyle Photography",
            category: "Photography",
            image: "/WhatsApp Image 2026-02-20 at 03.58.30.jpeg",
            strength: 8.5
        },
        {
            id: 4,
            title: "Corporate Rebranding",
            category: "Brand Identity",
            image: "/WhatsApp Image 2026-02-20 at 04.00.58.jpeg",
            strength: 8.2
        },
        {
            id: 5,
            title: "Event Flyer Design",
            category: "Design",
            image: "/WhatsApp Image 2026-02-20 at 04.00.56.jpeg",
            strength: 8.0
        },
        {
            id: 6,
            title: "Digital Art Composition",
            category: "Campaign Design",
            image: "/WhatsApp Image 2026-02-20 at 04.00.48.jpeg",
            strength: 7.5
        }
    ]
};

export function renderProjects() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    // Sort by visual strength descending
    const sorted = portfolioData.projects.sort((a, b) => b.strength - a.strength);

    gallery.innerHTML = sorted.map(project => `
    <article class="project-card">
      <div class="project-image-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" />
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <span class="project-category">${project.category}</span>
      </div>
    </article>
  `).join('');
}
