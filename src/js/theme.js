// Theme toggle functionality
export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    // Theme toggle handlers
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
