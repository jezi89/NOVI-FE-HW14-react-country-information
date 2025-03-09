// src/assets/components/ScrollIndicator.jsx
import {useEffect, useState} from 'react';
import './ScrollIndicator.css';

function ScrollIndicator({containerRef, delay = 3000}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!containerRef?.current) return;

        let timeout;
        let fadeTimeout;

        const checkScrollable = () => {
            const container = containerRef.current;
            // More reliable scrollable check
            const isScrollable = container.scrollHeight > container.offsetHeight + 10;

            if (isScrollable) {
                // Set timeout to show the indicator
                timeout = setTimeout(() => {
                    setIsVisible(true);

                    // Create a subtle nudge effect
                    const originalScroll = container.scrollTop;
                    container.scrollTo({
                        top: originalScroll + 40,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        container.scrollTo({
                            top: originalScroll,
                            behavior: 'smooth'
                        });

                        // Hide indicator after 5 seconds
                        fadeTimeout = setTimeout(() => {
                            setIsVisible(false);
                        }, 5000);
                    }, 1000);
                }, delay);
            }
        };

        // Check when countries are loaded and periodically
        checkScrollable();

        // Also check on window resize
        const handleResize = () => {
            checkScrollable();
        };

        // Hide indicator when user scrolls
        const handleScroll = () => {
            setIsVisible(false);
            clearTimeout(timeout);
            clearTimeout(fadeTimeout);
        };

        containerRef.current.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeout);
            clearTimeout(fadeTimeout);
            containerRef.current?.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef, delay]);

    if (!isVisible) return null;

    return (
        <div className="scroll-indicator">
            <div className="scroll-text">Scroll for more</div>
            <div className="scroll-arrow">↓</div>
        </div>
    );
}

export default ScrollIndicator;
