// Main application entry point
import './styles/main.css';
import { initTheme } from './js/theme.js';
import { initNavigation } from './js/navigation.js';
import { initAnimations, initVantaBackground } from './js/animations.js';
import { initIcons } from './js/icons.js';

// Wait for external scripts to load
function waitForGlobals() {
    return new Promise((resolve) => {
        const checkGlobals = () => {
            if (typeof feather !== 'undefined' && typeof VANTA !== 'undefined') {
                resolve();
            } else {
                setTimeout(checkGlobals, 100);
            }
        };
        checkGlobals();
    });
}

// Initialize all functionality when DOM and external scripts are loaded
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initNavigation();
    initAnimations();
    
    // Wait for external scripts then initialize icons and background
    await waitForGlobals();
    initIcons();
    
    // Initialize Vanta background after a short delay to ensure the element exists
    setTimeout(() => {
        initVantaBackground();
    }, 100);
});
