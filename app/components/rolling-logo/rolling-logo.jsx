import { useRef } from 'react';
import gsap from 'gsap';
import styles from './rolling-logo.module.css';

export function RollingLogo() {
    const lettersRef = useRef([]);

    const handleHover = () => {
        lettersRef.current.forEach((el, index) => {
            if (!el) return;

            gsap.killTweensOf(el);

            const timeline = gsap.timeline();

            // Elastic Cyber Stretch
            // 1. Rapid vertical expansion (Energy Beam)
            timeline.to(el, {
                scaleY: 2.5,          // Stretch tall
                scaleX: 0.8,          // Narrow slightly
                color: '#0ff0dc',     // Neon Cyan
                textShadow: '0 0 20px #0ff0dc', // Glow
                duration: 0.1,
                ease: 'power2.out'
            });

            // 2. Snap back with elasticity
            timeline.to(el, {
                scaleY: 1,
                scaleX: 1,
                color: 'var(--text)',
                textShadow: 'none',
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)' // Bouncy return
            });
        });
    };

    return (
        <div
            className={styles.container}
            onMouseEnter={handleHover}
            aria-label="ORR Logo"
        >
            <span
                ref={el => lettersRef.current[0] = el}
                className={styles.letter}
                style={{ transformOrigin: 'center bottom' }} // Stretch from bottom
            >
                O
            </span>
            <span
                ref={el => lettersRef.current[1] = el}
                className={styles.letter}
                style={{ transformOrigin: 'center bottom' }}
            >
                R
            </span>
        </div>
    );
}
