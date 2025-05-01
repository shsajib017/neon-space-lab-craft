
// DOM Elements
const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeModals = document.querySelectorAll('.close-modal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const exploreBtn = document.querySelector('.hero-buttons .btn-primary');

// Data Structure Setup
const initializeLocalStorage = () => {
  // Only initialize if the collections don't exist
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify([]));
  }
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify([]));
  }
  if (!localStorage.getItem('events')) {
    localStorage.setItem('events', JSON.stringify([]));
  }
};

// Navigation Toggle
if (navbarToggle) {
  navbarToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
}

// Modal Handling
const openModal = (modal) => {
  if (modal) {
    modal.classList.add('active');
  }
};

const closeModal = (modal) => {
  if (modal) {
    modal.classList.remove('active');
  }
};

// Event Listeners for Modals
if (loginBtn) {
  loginBtn.addEventListener('click', () => openModal(loginModal));
}

if (signupBtn) {
  signupBtn.addEventListener('click', () => openModal(signupModal));
}

closeModals.forEach(button => {
  button.addEventListener('click', () => {
    closeModal(loginModal);
    closeModal(signupModal);
  });
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    closeModal(loginModal);
  }
  if (event.target === signupModal) {
    closeModal(signupModal);
  }
});

// Form Handling
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Basic form validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Authentication would go here in a real app
    console.log('Login attempt:', email);
    alert('Login functionality will be implemented in Phase 2');
    
    closeModal(loginModal);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;
    
    // Basic form validation
    if (!name || !email || !password || !role) {
      alert('Please fill in all fields');
      return;
    }
    
    // In a real app, this would be sent to a server for processing
    console.log('Signup request:', { name, email, role });
    alert('Registration request sent! Admin approval pending.');
    
    closeModal(signupModal);
  });
}

// Navigation
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    window.location.href = 'projects.html';
  });
}

// Project cards hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px, 
        rgba(0, 245, 255, 0.1), 
        var(--card-bg) 40%
      )
    `;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--card-bg)';
  });
});

// Initialize localStorage on page load
document.addEventListener('DOMContentLoaded', initializeLocalStorage);
