/**
 * Portfolio Main JS
 * Handles loading and rendering projects from Google Drive API
 * Works for Photography, Films, and Designs categories
 */

const API_BASE_URL = 'http://localhost:3000/api'; // Change for production

// Sample fallback data (if API unavailable)
const FALLBACK_DATA = {
  photography: [
    { title: 'Monsoon Narratives', description: 'A series exploring the raw emotion and movement of monsoon rains', image: '../images/photography-1.jpg' },
    { title: 'Urban Geometry', description: 'Capturing the interplay of lines, light, and shadows in modern architectural spaces', image: '../images/photography-2.jpg' },
    { title: 'Portrait Studies', description: 'Intimate portraits exploring identity, expression, and human connection', image: '../images/photography-3.jpg' }
  ],
  films: [
    { title: 'Monochrome Motion', description: 'A study of movement in black and white', video: '', thumbnail: '../images/films-1.jpg' },
    { title: 'Urban Rhythm', description: 'Rhythm meets architecture in the city', video: '', thumbnail: '../images/films-2.jpg' },
    { title: 'Temporal Study', description: 'Time as a visual element', video: '', thumbnail: '../images/films-3.jpg' }
  ],
  designs: [
    { title: 'Visual Systems', description: 'Scalable design language for products', image: '../images/designs-1.jpg' },
    { title: 'Brand Identity', description: 'Complete brand identity system', image: '../images/designs-2.jpg' },
    { title: 'Digital Product', description: 'Mobile app for creative professionals', image: '../images/designs-3.jpg' }
  ]
};

/**
 * Load projects from API
 * @param {string} category - 'photography', 'films', or 'designs'
 */
async function loadProjects(category) {
  const projectsContainer = document.getElementById('projects');
  
  if (!projectsContainer) {
    console.error('Element with id "projects" not found');
    return;
  }

  try {
    // Try to fetch from API
    const response = await fetch(`${API_BASE_URL}/projects/${category}`);
    
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data = await response.json();
    renderProjects(data, category, projectsContainer);
    
  } catch (error) {
    console.warn(`Failed to load from API: ${error.message}`);
    console.log(`Using fallback data for ${category}`);
    
    // Use fallback data
    const fallbackProjects = FALLBACK_DATA[category] || [];
    renderProjects(fallbackProjects, category, projectsContainer);
  }
}

/**
 * Render projects to DOM
 * @param {array} projects - Array of project objects
 * @param {string} category - Project category
 * @param {element} container - DOM element to render into
 */
function renderProjects(projects, category, container) {
  if (!projects || projects.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No projects yet. Check back soon!</p>';
    return;
  }

  const projectHTML = projects.map(project => {
    let mediaHTML = '';
    
    // Handle different media types based on category
    if (category === 'films' && project.video) {
      mediaHTML = `<video src="${project.video}" controls style="width: 100%; height: auto; display: block; border-radius: 8px;"></video>`;
    } else if (category === 'films' && project.thumbnail) {
      mediaHTML = `<img src="${project.thumbnail}" alt="${project.title}" style="width: 100%; height: auto; display: block; border-radius: 8px;">`;
    } else if (project.image) {
      mediaHTML = `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: auto; display: block; border-radius: 8px;">`;
    } else {
      mediaHTML = `<div style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #c3b287, #6b5b3f); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">📸</div>`;
    }

    return `
      <div class="project-card" style="cursor: pointer; transition: transform 0.3s ease; border-radius: 8px; overflow: hidden;">
        <div style="position: relative;">
          ${mediaHTML}
        </div>
        <h3 style="font-size: 14px; margin-top: 10px; font-weight: 600; color: #f5f5f5;">
          ${project.title}
        </h3>
        <p style="font-size: 12px; color: #999; margin-top: 5px;">
          ${project.description || project.concept || ''}
        </p>
      </div>
    `;
  }).join('');

  container.innerHTML = projectHTML;

  // Add hover effects
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Alternative: Load from local JSON file
 * Useful for static hosting or if API unavailable
 */
async function loadProjectsFromJSON(category) {
  const projectsContainer = document.getElementById('projects');
  
  if (!projectsContainer) {
    console.error('Element with id "projects" not found');
    return;
  }

  try {
    const response = await fetch(`../data/${category}.json`);
    const projects = await response.json();
    renderProjects(projects, category, projectsContainer);
  } catch (error) {
    console.warn(`Failed to load ${category}.json: ${error.message}`);
    const fallbackProjects = FALLBACK_DATA[category] || [];
    renderProjects(fallbackProjects, category, projectsContainer);
  }
}

/**
 * Utility: Check API health
 */
async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log('API Status:', data);
    return data.status === 'ok';
  } catch (error) {
    console.warn('API unreachable:', error.message);
    return false;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadProjects, loadProjectsFromJSON, checkAPIHealth };
}
