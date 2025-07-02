// Portfolio JavaScript - Interactive Features

// Project data for modals
const projectData = {
  1: {
    title: "Patient Readmission Analysis",
    domain: "Healthcare Analytics",
    description: "Analyzing 30-day hospital readmissions to improve patient outcomes and reduce healthcare costs",
    challenge: "Hospital readmissions within 30 days significantly impact patient outcomes and healthcare costs. The challenge was to identify patterns and risk factors that contribute to readmissions to develop targeted intervention strategies.",
    dataSource: "Medicare Hospital Readmissions Reduction Program data containing patient demographics, diagnosis codes, hospital characteristics, and readmission outcomes across multiple healthcare facilities.",
    methodology: "Utilized advanced Tableau analytics including geographic mapping, time series analysis, and correlation matrices. Created calculated fields for risk scoring and implemented parameter controls for dynamic filtering.",
    visualizations: ["Geographic heatmap of readmission rates by state/region", "Time series analysis of readmission trends", "Risk factor correlation matrix", "Hospital performance dashboard with KPIs"],
    keyFindings: [
      "High-risk patient demographics identified in 3 key regions",
      "Seasonal patterns show 25% increase in winter readmissions",
      "Cost savings potential through targeted interventions",
      "Cardiovascular patients show highest readmission risk (34.5%)",
      "Weekend discharge correlation with 18% higher readmission rates"
    ],
    technicalImplementation: "Advanced calculated fields for risk scoring, LOD expressions for hospital comparisons, parameter controls for dynamic date filtering, and custom geocoding for regional analysis.",
    businessImpact: "Potential healthcare cost reduction annually through data-driven patient care optimization and targeted intervention programs.",
    graphImages: [
      "1.png" 
    ]
  },
  2: {
    title: "COVID-19 Impact Assessment",
    domain: "Healthcare Analytics", 
    description: "Analyzing COVID-19's multi-dimensional impact on healthcare systems and recovery patterns",
    challenge: "The COVID-19 pandemic created unprecedented challenges for healthcare systems. The goal was to analyze ICU capacity utilization, vaccination effectiveness, and economic impact to optimize resource allocation and policy decisions.",
    dataSource: "Johns Hopkins COVID-19 data combined with hospital capacity metrics, vaccination rollout data, and economic indicators from multiple healthcare systems and government sources.",
    methodology: "Integrated multiple data sources using Tableau Prep, created predictive models for ICU capacity forecasting, and developed interactive dashboards with real-time parameter controls for scenario analysis.",
    visualizations: ["Interactive world map with case progression", "ICU capacity vs. demand analysis", "Vaccination rollout effectiveness dashboard", "Economic impact correlation charts"],
    keyFindings: [
      "ICU capacity utilization peaked at 89% during Delta variant surge",
      "Vaccination rollout correlated with 67% reduction in severe cases",
      "Economic impact analysis shows deferred procedures",
      "Regional healthcare disparities identified across 12 states",
      "Resource allocation optimization saved in operational costs"
    ],
    technicalImplementation: "Real-time data connections, forecasting algorithms using exponential smoothing, custom map layers for geographic analysis, and advanced parameter controls for scenario modeling.",
    businessImpact: "Improved healthcare resource allocation saving operational costs and enabling data-driven policy decisions during crisis management.",
    graphImages: [
      "2.png" 
    ]
  },
  3: {
    title: "Investment Portfolio Performance",
    domain: "Financial Analytics",
    description: "Optimizing investment strategies through comprehensive market analysis and risk assessment",
    challenge: "Investment portfolio optimization requires comprehensive analysis of market trends, risk factors, and sector performance. The challenge was to create a data-driven approach for maximizing risk-adjusted returns while maintaining diversification.",
    dataSource: "S&P 500 historical data, sector performance metrics, economic indicators, and volatility indices spanning 10+ years of market data from multiple financial data providers.",
    methodology: "Implemented advanced financial calculations including Sharpe ratios, beta coefficients, and correlation matrices. Created dynamic portfolio rebalancing models with Monte Carlo simulations for risk assessment.",
    visualizations: ["Portfolio performance treemap", "Risk-return scatter plots", "Moving averages and technical indicators", "Sector rotation analysis", "Economic correlation dashboard"],
    keyFindings: [
      "Technology sector outperformed by 34% in growth periods",
      "Risk-adjusted returns improved through diversification strategies", 
      "Market timing strategies yielded additional returns",
      "Volatility patterns predict optimal rebalancing windows",
      "ESG factors correlate with 8% premium in long-term performance"
    ],
    technicalImplementation: "Complex calculated fields for financial ratios, custom date parameters for backtesting, advanced statistical functions, and integration with real-time market data feeds.",
    businessImpact: "Investment portfolio optimization resulting in improved risk-adjusted returns and reduced portfolio volatility through systematic rebalancing strategies.",
    graphImages: [
      "3.png" 
    ]
  },
  4: {
    title: "E-commerce Performance Optimization",
    domain: "Sales & Marketing Analytics",
    description: "Driving revenue growth through data-driven sales strategy and customer behavior analysis",
    challenge: "E-commerce businesses need to optimize customer acquisition, retention, and lifetime value while maximizing revenue per customer. The challenge was to identify high-value customer segments and optimize the sales funnel.",
    dataSource: "Sample Superstore data enhanced with customer segmentation analysis, transaction history, product catalog data, and seasonal trend information across multiple years.",
    methodology: "Developed cohort analysis for customer lifetime value calculation, implemented RFM segmentation for customer classification, and created predictive models for sales forecasting using Tableau's built-in analytics.",
    visualizations: ["Customer lifetime value analysis", "Product performance matrix", "Sales funnel conversion rates", "Geographic sales distribution", "Seasonal trend analysis with forecasting"],
    keyFindings: [
      "Corporate segment generates 3x higher CLV than Consumer segment",
      "West region shows highest growth potential (28% YoY increase)",
      "Product bundling strategy increases average order value by 31%",
      "Customer retention improved by 19% through targeted campaigns",
      "Seasonal forecasting accuracy improved to 94%"
    ],
    technicalImplementation: "Advanced LOD expressions for cohort analysis, calculated fields for CLV metrics, clustering algorithms for customer segmentation, and time series forecasting with confidence intervals.",
    businessImpact: "Revenue growth acceleration through customer lifetime value optimization and data-driven sales strategy implementation.",
    graphImages: [
      "4.png" 
    ]
  }
};

// DOM Elements - using more specific selectors
let themeToggle, navHamburger, navMenu, projectModal, modalBody, contactForm;

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Navigation
function initNavigation() {
  // Get DOM elements with error checking
  navHamburger = document.getElementById('nav-hamburger');
  navMenu = document.getElementById('nav-menu');

  if (!navHamburger || !navMenu) {
    console.error('Navigation elements not found');
    return;
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      smoothScrollTo(targetId);
      
      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // Mobile hamburger menu with explicit event handling
  navHamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navHamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Update active navigation link on scroll
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);

  console.log('Navigation initialized successfully');
}

function toggleMobileMenu() {
  if (!navMenu || !navHamburger) return;
  
  const isActive = navMenu.classList.contains('active');
  
  if (isActive) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  navMenu.classList.add('active');
  navHamburger.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileMenu() {
  navMenu.classList.remove('active');
  navHamburger.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100 && sectionTop >= -section.offsetHeight + 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Project Modal Management
function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });
}

function openProjectModal(projectId) {
  projectModal = document.getElementById('project-modal');
  modalBody = document.getElementById('modal-body');
  
  console.log('Attempting to open modal for project:', projectId);
  console.log('projectModal element:', projectModal);
  console.log('modalBody element:', modalBody);

  if (!projectModal || !modalBody) {
    console.error('Modal elements not found. Check IDs in index.html');
    return;
  }

  const project = projectData[projectId];
  if (!project) {
    console.error('Project data not found for ID:', projectId);
    return;
  }

  // Generate graph image HTML (only one image)
  const graphImageHtml = `
    <div class="modal-single-graph">
      <img src="${project.graphImages[0]}" alt="Project Visualization" class="modal-graph-img" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/000000?text=Image+Not+Found';" />
    </div>
  `;


  const modalContent = `
    <div class="modal-project-header">
      <h2 class="modal-project-title">${project.title}</h2>
      <div class="modal-project-domain">${project.domain}</div>
      <p class="modal-project-description">${project.description}</p>
    </div>

    <div class="modal-section">
      <h3>Business Challenge</h3>
      <p>${project.challenge}</p>
    </div>

    <div class="modal-section">
      <h3>Data Sources & Methodology</h3>
      <p><strong>Data Source:</strong> ${project.dataSource}</p>
      <p><strong>Methodology:</strong> ${project.methodology}</p>
    </div>

    <div class="modal-section">
      <h3>Key Visualization</h3>
      ${graphImageHtml}
      <p class="graph-caption">Interactive visualizations showcasing: ${project.visualizations.join(', ')}</p>
    </div>

    <div class="modal-section">
      <h3>Key Findings</h3>
      <ul class="findings-list">
        ${project.keyFindings.map(finding => `<li>${finding}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-section">
      <h3>Technical Implementation</h3>
      <p>${project.technicalImplementation}</p>
    </div>

    <div class="modal-section">
      <h3>Business Impact</h3>
      <p>${project.businessImpact}</p>
    </div>
  `;

  modalBody.innerHTML = modalContent;
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal = document.getElementById('project-modal');
  if (projectModal) {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Contact Form Management
function initContactForm() {
  contactForm = document.getElementById('contact-form');
  
  if (!contactForm) {
    console.error('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500',
    zIndex: '3000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    backgroundColor: type === 'success' ? '#28a745' : '#dc3545'
  });

  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.project-card, .skill-category, .about-content > *, .competency-item, .experience-card, .education-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Special animations for alternating elements
  document.querySelectorAll('.project-card:nth-child(odd)').forEach(el => {
    el.classList.add('slide-in-left');
  });

  document.querySelectorAll('.project-card:nth-child(even)').forEach(el => {
    el.classList.add('slide-in-right');
  });
}

// Competency bar animations
function animateCompetencyBars() {
  const competencyItems = document.querySelectorAll('.competency-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.competency-fill');
        if (bar) {
          // Animate the width
          setTimeout(() => {
            bar.style.width = bar.style.width || '0%';
          }, 300);
        }
      }
    });
  }, { threshold: 0.5 });

  competencyItems.forEach(item => observer.observe(item));
}

// Navbar scroll effect
function initNavbarScrollEffect() {
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// Performance optimization - Lazy loading
function initLazyLoading() {
  // Add loading states to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
  });
}

// Keyboard accessibility
function initKeyboardNavigation() {
  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('project-modal');
      if (modal && modal.classList.contains('active')) {
        closeProjectModal();
      }
      // Also close mobile menu on ESC
      if (navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  });

  // Tab navigation for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
      }
    });
  });
}

// Add loading animation
function addLoadingAnimation() {
  const loadingScreen = document.createElement('div');
  loadingScreen.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--color-background);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    ">
      <div style="
        width: 50px;
        height: 50px;
        border: 3px solid var(--color-primary);
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
    </div>
  `;
  
  // Add spinner animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(loadingScreen);
  
  // Remove loading screen after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 500);
    }, 800);
  });
}

// Initialize all functionality
function init() {
  // Add loading animation
  addLoadingAnimation();
  
  // Initialize theme first
  initTheme();
  
  // Wait for DOM to be fully ready
  setTimeout(() => {
    // Get theme toggle element
    themeToggle = document.getElementById('theme-toggle');
    
    // Initialize core features
    initNavigation();
    initProjectCards();
    initContactForm();
    initScrollAnimations();
    initNavbarScrollEffect();
    initLazyLoading();
    initKeyboardNavigation();
    animateCompetencyBars();

    // Event listeners
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Global functions for inline event handlers
    window.smoothScrollTo = smoothScrollTo;
    window.closeProjectModal = closeProjectModal;
    window.toggleMobileMenu = toggleMobileMenu;

    console.log('Portfolio initialized successfully! 🚀');
  }, 100);
}

// Start the application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
