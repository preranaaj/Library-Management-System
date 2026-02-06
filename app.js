// Dark Mode Toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize dark mode from localStorage
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'success' 
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'}
            </svg>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Dropdown Toggle
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        if (!event.target.closest('.dropdown-container')) {
            dropdown.classList.add('hidden');
        }
    });
});

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Tab Switching
function switchTab(tabName, groupName) {
    // Hide all tab contents in this group
    const tabContents = document.querySelectorAll(`.tab-content[data-group="${groupName}"]`);
    tabContents.forEach(content => content.classList.add('hidden'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll(`.tab-button[data-group="${groupName}"]`);
    tabs.forEach(tab => {
        tab.classList.remove('bg-primary', 'text-white');
        tab.classList.add('bg-white', 'dark:bg-gray-800', 'border', 'border-gray-200', 'dark:border-gray-700');
    });

    // Show selected tab content
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }

    // Add active class to selected tab
    const selectedTab = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.remove('bg-white', 'dark:bg-gray-800', 'border', 'border-gray-200', 'dark:border-gray-700');
        selectedTab.classList.add('bg-primary', 'text-white');
    }
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            input.classList.add('border-red-500');
            isValid = false;
        }
    });

    return isValid;
}

// Search Functionality
function handleSearch(searchTerm) {
    if (searchTerm.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
    }
}

// Get URL Parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Local Storage Helper
const Storage = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

// User Authentication (Demo)
const Auth = {
    login: (email, password) => {
        // Demo authentication
        if (email === 'admin@lib.com' && password === 'admin123') {
            Storage.set('user', { email, role: 'admin', name: 'Admin' });
            window.location.href = 'admin.html';
        } else {
            Storage.set('user', { email, role: 'student', name: 'Ajay' });
            window.location.href = 'dashboard.html';
        }
    },
    logout: () => {
        Storage.remove('user');
        window.location.href = 'index.html';
    },
    getUser: () => {
        return Storage.get('user');
    },
    isAuthenticated: () => {
        return Storage.get('user') !== null;
    }
};

// Check authentication on protected pages
function requireAuth() {
    if (!Auth.isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();

    // Set user info if logged in
    const user = Auth.getUser();
    if (user) {
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => el.textContent = user.name);
    }
});

// Password Toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = event.currentTarget;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
        `;
    } else {
        input.type = 'password';
        button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
        `;
    }
}

// Checkbox Select All
function toggleSelectAll(checkboxId, groupClass) {
    const checkbox = document.getElementById(checkboxId);
    const checkboxes = document.querySelectorAll(`.${groupClass}`);
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
    updateSelectionCount(groupClass);
}

// Update selection count
function updateSelectionCount(groupClass) {
    const checkboxes = document.querySelectorAll(`.${groupClass}:checked`);
    const countElement = document.getElementById('selection-count');
    if (countElement) {
        countElement.textContent = checkboxes.length;
    }
}

// Accordion Toggle
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = event.currentTarget.querySelector('svg:last-child');
    
    if (content) {
        content.classList.toggle('hidden');
        if (icon) {
            icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
}

// View Mode Toggle
function setViewMode(mode) {
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');

    if (mode === 'grid') {
        gridView?.classList.remove('hidden');
        listView?.classList.add('hidden');
        gridBtn?.classList.add('bg-primary', 'text-white');
        gridBtn?.classList.remove('bg-gray-100', 'dark:bg-gray-800');
        listBtn?.classList.remove('bg-primary', 'text-white');
        listBtn?.classList.add('bg-gray-100', 'dark:bg-gray-800');
    } else {
        gridView?.classList.add('hidden');
        listView?.classList.remove('hidden');
        listBtn?.classList.add('bg-primary', 'text-white');
        listBtn?.classList.remove('bg-gray-100', 'dark:bg-gray-800');
        gridBtn?.classList.remove('bg-primary', 'text-white');
        gridBtn?.classList.add('bg-gray-100', 'dark:bg-gray-800');
    }
}
