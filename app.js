
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
const joinBtn = document.querySelector('.hero-buttons .btn-secondary');

// Data Structure Setup
const initializeLocalStorage = () => {
  // Only initialize if the collections don't exist
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'researcher', approved: true },
      { id: 2, name: 'Alice Smith', email: 'alice@example.com', password: 'password123', role: 'faculty', approved: true }
    ]));
  }
  if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify(null));
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

if (joinBtn) {
  joinBtn?.addEventListener('click', () => openModal(signupModal));
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
    
    // Check credentials against stored users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password && u.approved);
    
    if (user) {
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Update UI based on login state
      updateUIForLoggedInUser(user);
      
      closeModal(loginModal);
      alert(`Welcome back, ${user.name}!`);
      
      // Redirect to profile if on index page
      if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Create a profile.html page dynamically if it doesn't exist
        createDynamicProfilePage(user);
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1000);
      }
    } else {
      alert('Invalid email or password, or your account is pending approval.');
    }
  });
}

function createDynamicProfilePage(user) {
  // Check if profile page already exists in local storage
  if (!localStorage.getItem('profilePage')) {
    const profileHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile | Modern Engineering Systems Laboratory</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./styles.css">
        <style>
          /* Profile page specific styles */
          .profile-container {
            padding-top: calc(var(--navbar-height) + var(--spacing-lg));
            padding-bottom: var(--spacing-xl);
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: var(--spacing-xl);
          }
          
          .profile-sidebar {
            background: var(--card-bg);
            border-radius: var(--card-radius);
            padding: var(--spacing-lg);
            border: 1px solid var(--border);
            height: fit-content;
          }
          
          .profile-content {
            background: var(--card-bg);
            border-radius: var(--card-radius);
            padding: var(--spacing-lg);
            border: 1px solid var(--border);
          }
          
          .profile-header {
            display: flex;
            align-items: center;
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-lg);
            border-bottom: 1px solid var(--border);
          }
          
          .profile-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: var(--spacing-lg);
            font-size: 3rem;
            font-weight: 600;
            color: var(--text);
            border: 3px solid var(--secondary);
            box-shadow: var(--glow);
          }
          
          .profile-details h2 {
            margin-bottom: var(--spacing-xs);
          }
          
          .profile-role {
            color: var(--secondary);
            font-size: 1.1rem;
            margin-bottom: var(--spacing-sm);
          }
          
          .profile-meta {
            display: flex;
            gap: var(--spacing-md);
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
          
          .profile-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .profile-nav {
            margin-bottom: var(--spacing-lg);
          }
          
          .profile-nav-item {
            display: flex;
            align-items: center;
            padding: var(--spacing-sm) var(--spacing-md);
            margin-bottom: var(--spacing-xs);
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--text);
            text-decoration: none;
          }
          
          .profile-nav-item:hover,
          .profile-nav-item.active {
            background: rgba(4, 102, 200, 0.2);
          }
          
          .profile-nav-item.active {
            color: var(--secondary);
          }
          
          .profile-nav-item span:first-child {
            margin-right: var(--spacing-sm);
            min-width: 24px;
          }
          
          .profile-section {
            margin-bottom: var(--spacing-lg);
          }
          
          .profile-section h3 {
            margin-bottom: var(--spacing-md);
            padding-bottom: var(--spacing-sm);
            border-bottom: 1px solid var(--border);
          }
          
          .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
          }
          
          .profile-projects {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: var(--spacing-md);
            margin-top: var(--spacing-md);
          }
          
          .profile-project {
            background: rgba(0, 0, 0, 0.2);
            border-radius: var(--card-radius);
            padding: var(--spacing-md);
            border: 1px solid var(--border);
            transition: all 0.3s ease;
          }
          
          .profile-project:hover {
            border-color: var(--secondary);
            box-shadow: var(--glow);
          }
          
          .profile-project h4 {
            margin-bottom: var(--spacing-xs);
          }
          
          .profile-project-meta {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-sm);
          }
          
          .profile-badges {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-md);
          }
          
          .badge {
            background: rgba(4, 102, 200, 0.2);
            color: var(--text-secondary);
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            border: 1px solid var(--border);
          }
          
          .badge.highlighted {
            background: rgba(0, 245, 255, 0.2);
            color: var(--secondary);
            border-color: var(--secondary);
            box-shadow: var(--glow);
          }
          
          .logout-container {
            margin-top: var(--spacing-lg);
            text-align: center;
          }
          
          .btn-logout {
            background: transparent;
            color: var(--text-secondary);
            border: 1px solid var(--border);
            padding: var(--spacing-xs) var(--spacing-lg);
            border-radius: var(--border-radius);
            font-family: var(--font-heading);
            transition: all 0.3s ease;
          }
          
          .btn-logout:hover {
            border-color: var(--destructive);
            color: var(--destructive);
          }
          
          @media (max-width: 768px) {
            .profile-container {
              grid-template-columns: 1fr;
            }
            
            .profile-header {
              flex-direction: column;
              text-align: center;
            }
            
            .profile-avatar {
              margin-right: 0;
              margin-bottom: var(--spacing-md);
            }
            
            .profile-meta {
              justify-content: center;
            }
            
            .form-row {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <!-- Navbar -->
        <nav class="navbar">
          <div class="container">
            <div class="navbar-logo">
              <a href="index.html">
                <span class="neon-text">LAB</span>_WEB
              </a>
            </div>
            
            <div class="navbar-links">
              <a href="index.html">Home</a>
              <a href="projects.html">Projects</a>
              <a href="feed.html">Feed</a>
              <a href="gallery.html">Gallery</a>
            </div>
            
            <div class="navbar-auth">
              <span id="user-welcome" class="neon-text">Welcome, User</span>
              <button class="btn-logout">Logout</button>
            </div>
            
            <div class="navbar-toggle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      
        <div class="container">
          <div class="profile-container">
            <!-- Profile Sidebar -->
            <div class="profile-sidebar">
              <div class="profile-user">
                <div class="user-avatar" id="sidebar-avatar">JD</div>
                <h3 class="user-name" id="sidebar-name">John Doe</h3>
                <p class="user-role" id="sidebar-role">Researcher</p>
                <div class="user-badges">
                  <span class="badge highlighted">Lab Member</span>
                  <span class="badge">Contributor</span>
                </div>
              </div>
              
              <div class="profile-nav">
                <a href="#overview" class="profile-nav-item active">
                  <span>📊</span>
                  <span>Overview</span>
                </a>
                <a href="#projects" class="profile-nav-item">
                  <span>🔬</span>
                  <span>Projects</span>
                </a>
                <a href="#settings" class="profile-nav-item">
                  <span>⚙️</span>
                  <span>Settings</span>
                </a>
              </div>
              
              <div class="logout-container">
                <button class="btn-logout">Log Out</button>
              </div>
            </div>
            
            <!-- Profile Content -->
            <div class="profile-content">
              <div class="profile-header">
                <div class="profile-avatar" id="main-avatar">JD</div>
                <div class="profile-details">
                  <h2 id="main-name">John Doe</h2>
                  <p class="profile-role" id="main-role">Researcher</p>
                  <div class="profile-meta">
                    <span>
                      <span>📅</span>
                      <span>Member since May 2023</span>
                    </span>
                    <span>
                      <span>📁</span>
                      <span>3 Projects</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="profile-section" id="overview">
                <h3>OVERVIEW</h3>
                <p>Welcome to your profile dashboard. Here you can manage your projects, update your personal information, and connect with other lab members.</p>
                
                <div class="profile-badges">
                  <span class="badge highlighted">Lab Member</span>
                  <span class="badge">Contributor</span>
                  <span class="badge">AI Research</span>
                  <span class="badge">Neural Networks</span>
                  <span class="badge">Quantum Computing</span>
                </div>
              </div>
              
              <div class="profile-section" id="projects">
                <h3>MY PROJECTS</h3>
                
                <div class="profile-projects">
                  <!-- Project 1 -->
                  <div class="profile-project">
                    <h4>Quantum Neural Interface</h4>
                    <div class="profile-project-meta">
                      <div>Status: Active</div>
                      <div>Last updated: 2 days ago</div>
                    </div>
                    <div class="project-tech">
                      <span>Quantum</span>
                      <span>Neural</span>
                    </div>
                  </div>
                  
                  <!-- Project 2 -->
                  <div class="profile-project">
                    <h4>Swarm Intelligence Model</h4>
                    <div class="profile-project-meta">
                      <div>Status: Active</div>
                      <div>Last updated: 1 week ago</div>
                    </div>
                    <div class="project-tech">
                      <span>AI</span>
                      <span>Swarm</span>
                    </div>
                  </div>
                  
                  <!-- Project 3 -->
                  <div class="profile-project">
                    <h4>Advanced Material Simulation</h4>
                    <div class="profile-project-meta">
                      <div>Status: Complete</div>
                      <div>Last updated: 1 month ago</div>
                    </div>
                    <div class="project-tech">
                      <span>Materials</span>
                      <span>Simulation</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="profile-section" id="settings">
                <h3>PROFILE SETTINGS</h3>
                
                <form id="profile-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="profile-name">Full Name</label>
                      <input type="text" id="profile-name" class="form-control" value="John Doe">
                    </div>
                    
                    <div class="form-group">
                      <label for="profile-email">Email</label>
                      <input type="email" id="profile-email" class="form-control" value="john@example.com" readonly>
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="profile-role">Role</label>
                      <select id="profile-role" class="form-control">
                        <option value="student">Student</option>
                        <option value="researcher" selected>Researcher</option>
                        <option value="faculty">Faculty</option>
                        <option value="industry">Industry Partner</option>
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label for="profile-specialization">Specialization</label>
                      <input type="text" id="profile-specialization" class="form-control" value="Quantum Computing">
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="profile-bio">Bio</label>
                    <textarea id="profile-bio" class="form-control" rows="4">Researcher specialized in quantum computing applications for machine learning and artificial intelligence.</textarea>
                  </div>
                  
                  <button type="submit" class="btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      
        <footer>
          <div class="container">
            <div class="footer-content">
              <div class="footer-logo">
                <span class="neon-text">LAB</span>_WEB
              </div>
              
              <div class="footer-links">
                <div class="footer-col">
                  <h4>Navigation</h4>
                  <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="projects.html">Projects</a></li>
                    <li><a href="feed.html">Feed</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                  </ul>
                </div>
                
                <div class="footer-col">
                  <h4>Resources</h4>
                  <ul>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Research Papers</a></li>
                    <li><a href="#">Lab Tools</a></li>
                    <li><a href="#">Equipment</a></li>
                  </ul>
                </div>
                
                <div class="footer-col">
                  <h4>Contact</h4>
                  <ul>
                    <li><a href="#">Email Us</a></li>
                    <li><a href="#">Location</a></li>
                    <li><a href="#">Social Media</a></li>
                    <li><a href="#">Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="footer-bottom">
              <p>&copy; 2025 LAB_WEB. All rights reserved.</p>
            </div>
          </div>
        </footer>
      
        <script src="./app.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
              // Redirect to index if not logged in
              window.location.href = 'index.html';
              return;
            }
            
            // Update profile information
            const navWelcome = document.getElementById('user-welcome');
            const sidebarAvatar = document.getElementById('sidebar-avatar');
            const sidebarName = document.getElementById('sidebar-name');
            const sidebarRole = document.getElementById('sidebar-role');
            const mainAvatar = document.getElementById('main-avatar');
            const mainName = document.getElementById('main-name');
            const mainRole = document.getElementById('main-role');
            const profileNameInput = document.getElementById('profile-name');
            const profileEmailInput = document.getElementById('profile-email');
            const profileRoleSelect = document.getElementById('profile-role');
            
            // Get user initials for avatar
            const initials = currentUser.name.split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase();
            
            // Update elements with user info
            if (navWelcome) navWelcome.textContent = \`Welcome, \${currentUser.name}\`;
            if (sidebarAvatar) sidebarAvatar.textContent = initials;
            if (sidebarName) sidebarName.textContent = currentUser.name;
            if (sidebarRole) sidebarRole.textContent = capitalizeFirstLetter(currentUser.role);
            if (mainAvatar) mainAvatar.textContent = initials;
            if (mainName) mainName.textContent = currentUser.name;
            if (mainRole) mainRole.textContent = capitalizeFirstLetter(currentUser.role);
            
            // Update form fields
            if (profileNameInput) profileNameInput.value = currentUser.name;
            if (profileEmailInput) profileEmailInput.value = currentUser.email;
            if (profileRoleSelect) profileRoleSelect.value = currentUser.role;
            
            // Handle profile form submission
            const profileForm = document.getElementById('profile-form');
            if (profileForm) {
              profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get updated values
                const updatedName = profileNameInput.value;
                const updatedRole = profileRoleSelect.value;
                
                // Update user in local storage
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                
                if (userIndex !== -1) {
                  users[userIndex].name = updatedName;
                  users[userIndex].role = updatedRole;
                  
                  localStorage.setItem('users', JSON.stringify(users));
                  
                  // Update current user
                  currentUser.name = updatedName;
                  currentUser.role = updatedRole;
                  localStorage.setItem('currentUser', JSON.stringify(currentUser));
                  
                  // Update UI
                  if (navWelcome) navWelcome.textContent = \`Welcome, \${updatedName}\`;
                  if (sidebarName) sidebarName.textContent = updatedName;
                  if (sidebarRole) sidebarRole.textContent = capitalizeFirstLetter(updatedRole);
                  if (mainName) mainName.textContent = updatedName;
                  if (mainRole) mainRole.textContent = capitalizeFirstLetter(updatedRole);
                  
                  // Get updated initials
                  const updatedInitials = updatedName.split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase();
                  
                  if (sidebarAvatar) sidebarAvatar.textContent = updatedInitials;
                  if (mainAvatar) mainAvatar.textContent = updatedInitials;
                  
                  alert('Profile updated successfully!');
                }
              });
            }
            
            // Handle logout buttons
            const logoutButtons = document.querySelectorAll('.btn-logout');
            logoutButtons.forEach(button => {
              button.addEventListener('click', function() {
                localStorage.setItem('currentUser', JSON.stringify(null));
                window.location.href = 'index.html';
              });
            });
            
            // Navigation
            const navItems = document.querySelectorAll('.profile-nav-item');
            navItems.forEach(item => {
              item.addEventListener('click', function() {
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
              });
            });
            
            // Helper function to capitalize first letter
            function capitalizeFirstLetter(string) {
              return string.charAt(0).toUpperCase() + string.slice(1);
            }
          });
        </script>
      </body>
      </html>
    `;
    
    // Save to local storage
    localStorage.setItem('profilePage', profileHTML);
    
    // Create the file in the file system (normally would be done by writing to the file)
    // Since we can't directly create files in the browser, this is just a simulation
    console.log('Profile page created dynamically');
  }
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
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      alert('This email is already registered');
      return;
    }
    
    // Add new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role,
      approved: false // Requires admin approval
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    closeModal(signupModal);
    alert('Registration request sent! Admin approval pending.');
  });
}

// Navigation
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    window.location.href = 'projects.html';
  });
}

// Check login state and update UI
function updateUIForLoggedInUser(user) {
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');
  const navbarAuth = document.querySelector('.navbar-auth');
  
  if (user && navbarAuth) {
    // Hide login/signup buttons
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    
    // Add welcome message and logout button
    if (!document.getElementById('user-welcome')) {
      const welcomeSpan = document.createElement('span');
      welcomeSpan.id = 'user-welcome';
      welcomeSpan.className = 'neon-text';
      welcomeSpan.textContent = `Welcome, ${user.name}`;
      navbarAuth.appendChild(welcomeSpan);
      
      const logoutButton = document.createElement('button');
      logoutButton.className = 'btn-logout';
      logoutButton.textContent = 'Logout';
      logoutButton.addEventListener('click', () => {
        localStorage.setItem('currentUser', JSON.stringify(null));
        window.location.reload();
      });
      navbarAuth.appendChild(logoutButton);
    }
  }
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

// Check for logged in user on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeLocalStorage();
  
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateUIForLoggedInUser(currentUser);
  }
});

// Create the profile.html file on first run
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    createDynamicProfilePage(currentUser);
  }
});
