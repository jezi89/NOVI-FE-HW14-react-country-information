// src/helpers/scrollHelper.js

/**
 * Performs smooth scrolling without showing the scrollbar
 * @param {Object} options - Scroll configuration options
 * @param {string} options.targetId - ID of the element to scroll to
 * @param {number} options.offset - Optional vertical offset from the target (default: 20)
 * @param {Function} options.onComplete - Optional callback after scrolling completes
 */
export function smoothScrollTo(options) {
    const {targetId, offset = 20, onComplete} = options;

    // Hide scrollbar during programmatic scrolling
    document.body.classList.add("scrolling-up");

    // Find target element
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.warn(`Element with ID '${targetId}' not found for scrolling`);
        return;
    }

    // Calculate target position with optional offset
    const rect = targetElement.getBoundingClientRect();
    const targetPosition = window.scrollY + rect.top - offset;

    // Perform scroll
    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    });

    // Execute callback and remove scrolling class after animation completes
    setTimeout(() => {
        if (onComplete && typeof onComplete === 'function') {
            onComplete();
        }

        setTimeout(() => {
            document.body.classList.remove("scrolling-up");
        }, 100);
    }, 700);
}

/**
 * Scrolls to the top of the page
 * @param {Function} onComplete - Optional callback after scrolling completes
 */
export function scrollToTop(onComplete) {
    document.body.classList.add("scrolling-up");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {
        if (onComplete && typeof onComplete === 'function') {
            onComplete();
        }

        setTimeout(() => {
            document.body.classList.remove("scrolling-up");
        }, 100);
    }, 700);
}
