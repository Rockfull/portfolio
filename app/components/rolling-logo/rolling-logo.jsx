import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import styles from './rolling-logo.module.css';

export function RollingLogo() {
    const lettersRef = useRef([]);

    useEffect(() => {
        const config = {
            proximity: 100, // Distance to trigger effect
            maxRotation: 90 // Degrees to rotate (90 shows bottom face)
        };

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            lettersRef.current.forEach((letterWrapper) => {
                if (!letterWrapper) return;

                // 1. Get center of the letter
                const rect = letterWrapper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // 2. Calculate distance
                const dx = mouseX - centerX;
                const dy = mouseY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // 3. Interpolate rotation
                let rotation = 0;

                if (distance < config.proximity) {
                    // Formula: (1 - percentage_distance) * maxRotation
                    const progress = 1 - (distance / config.proximity);
                    rotation = progress * config.maxRotation;
                }

                // 4. Apply GSAP
                gsap.to(letterWrapper, {
                    rotateX: rotation,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const word = "OR";

    return (
        <div className={styles.container} aria-label="ORR Logo">
            {word.split('').map((char, i) => (
                <div
                    key={i}
                    ref={el => lettersRef.current[i] = el}
                    className={styles.letterWrapper}
                >
                    {/* Front Face: Original letter */}
                    <span className={`${styles.face} ${styles.front}`}>
                        {char}
                    </span>

                    {/* Bottom Face: The revealed letter */}
                    <span className={`${styles.face} ${styles.bottom}`}>
                        {char}
                    </span>
                </div>
            ))}
        </div>
    );
}
