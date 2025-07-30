// Authentication utilities
const AUTH_API_BASE = '/api/auth';

// Token management
const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
};

// User management
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const removeUser = () => {
  localStorage.removeItem('user');
};

// API request helper with authentication
const apiRequest = async (url, options = {}) => {
  const token = getToken();
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    headers: defaultHeaders,
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Authentication functions
const login = async (email, password) => {
  try {
    const data = await apiRequest(`${AUTH_API_BASE}/login`, {
      method: 'POST',
      body: { email, password },
    });

    setToken(data.token);
    setUser(data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (name, email, password, role = 'customer') => {
  try {
    const data = await apiRequest(`${AUTH_API_BASE}/register`, {
      method: 'POST',
      body: { name, email, password, role },
    });

    setToken(data.token);
    setUser(data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  removeToken();
  removeUser();
  window.location.href = '/';
};

const getCurrentUser = async () => {
  try {
    const data = await apiRequest(`${AUTH_API_BASE}/me`);
    setUser(data.user);
    return data.user;
  } catch (error) {
    logout();
    throw error;
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getToken();
};

// Check user role
const isAdmin = () => {
  const user = getUser();
  return user && user.role === 'admin';
};

const isCustomer = () => {
  const user = getUser();
  return user && user.role === 'customer';
};

// Redirect if not authenticated
const requireAuth = (redirectTo = '/login') => {
  if (!isAuthenticated()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
};

// Redirect if not admin
const requireAdmin = (redirectTo = '/home') => {
  if (!isAuthenticated() || !isAdmin()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
};

// Initialize authentication state
const initAuth = async () => {
  if (isAuthenticated()) {
    try {
      await getCurrentUser();
      updateNavbar();
    } catch (error) {
      console.error('Auth initialization failed:', error);
    }
  } else {
    updateNavbar();
  }
};

// Update navbar based on authentication state
const updateNavbar = () => {
  const navAuth = document.getElementById('nav-auth');
  const navUser = document.getElementById('nav-user');
  
  if (!navAuth || !navUser) return;

  if (isAuthenticated()) {
    const user = getUser();
    navAuth.style.display = 'none';
    navUser.style.display = 'block';
    
    const userName = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    const adminLink = document.getElementById('admin-link');
    
    if (userName) userName.textContent = user.name;
    if (userRole) userRole.textContent = user.role;
    
    if (adminLink) {
      adminLink.style.display = user.role === 'admin' ? 'block' : 'none';
    }
  } else {
    navAuth.style.display = 'block';
    navUser.style.display = 'none';
  }
};

// Show toast notification
const showToast = (message, type = 'info') => {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  // Remove toast element after it's hidden
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
};

// Show loading state
const showLoading = (element) => {
  if (element) {
    element.disabled = true;
    element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
  }
};

// Hide loading state
const hideLoading = (element, originalText) => {
  if (element) {
    element.disabled = false;
    element.innerHTML = originalText;
  }
};