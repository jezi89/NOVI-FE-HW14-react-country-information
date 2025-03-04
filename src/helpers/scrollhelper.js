export function smoothScrollTo(options) {
    const {targetId, offset = 20, onComplete = null} = options;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.warn(`Element with ID '${targetId}' not found for scrolling`);
        return;
    }

    const rect = targetElement.getBoundingClientRect();
    const targetPosition = window.scrollY + rect.top - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
    });

    if (onComplete && typeof onComplete === 'function') {
        setTimeout(onComplete, 700);
    }
}

export function scrollToTop(onComplete) {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (onComplete && typeof onComplete === 'function') {
        setTimeout(onComplete, 700);
    }
}
