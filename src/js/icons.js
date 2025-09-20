// Icon initialization
export function initIcons() {
    // Initialize Feather icons using global feather object
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}
