// Animation and visual effects
import AOS from 'aos';

export function initAnimations() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

export function initVantaBackground() {
    // Initialize Vanta.js background effect
    if (typeof VANTA !== 'undefined' && VANTA.GLOBE) {
        VANTA.GLOBE({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            backgroundColor: 0x020617,
            size: 0.8
        });
    }
}
