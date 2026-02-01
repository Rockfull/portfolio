import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useWindowSize } from '~/hooks';
import styles from './scrollbar.module.css';

export function Scrollbar() {
    const thumbRef = useRef(null);
    const { height: windowHeight } = useWindowSize();
    const [thumbHeight, setThumbHeight] = useState(100);
    const [isDragging, setIsDragging] = useState(false);
    const scrollRef = useRef({ y: 0 });

    // Update logic
    useEffect(() => {
        const updateScrollbar = () => {
            const docHeight = document.body.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Calculate minimal height for usability
            const checkHeight = docHeight - winHeight;
            const progress = checkHeight > 0 ? scrollY / checkHeight : 0;

            // Calculate thumb height ratio
            const calculatedHeight = Math.max((winHeight / docHeight) * winHeight, 50);
            setThumbHeight(calculatedHeight);

            // Animate position
            const availableSpace = winHeight - calculatedHeight;
            const yPos = progress * availableSpace;

            if (thumbRef.current) {
                gsap.to(thumbRef.current, {
                    y: yPos,
                    duration: 0.1,
                    overwrite: 'auto',
                    ease: 'power1.out'
                });
            }
        };

        window.addEventListener('scroll', updateScrollbar);
        window.addEventListener('resize', updateScrollbar);
        // Initial call
        updateScrollbar();

        return () => {
            window.removeEventListener('scroll', updateScrollbar);
            window.removeEventListener('resize', updateScrollbar);
        };
    }, [windowHeight]);

    // Drag Logic
    useEffect(() => {
        let startY = 0;
        let startScroll = 0;

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const deltaY = e.clientY - startY;
            const winHeight = window.innerHeight;
            const docHeight = document.body.scrollHeight;
            const availableSpace = winHeight - thumbHeight;
            const scrollRatio = (docHeight - winHeight) / availableSpace;

            window.scrollTo(0, startScroll + deltaY * scrollRatio);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };

        const handleMouseDown = (e) => {
            e.preventDefault();
            setIsDragging(true);
            startY = e.clientY;
            startScroll = window.scrollY;
            document.body.style.userSelect = 'none'; // Prevent text selection
            document.body.style.cursor = 'grab';
        };

        if (thumbRef.current) {
            thumbRef.current.addEventListener('mousedown', handleMouseDown);
        }

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            if (thumbRef.current) {
                thumbRef.current.removeEventListener('mousedown', handleMouseDown);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, thumbHeight]);

    return (
        <div className={styles.scrollbarContainer}>
            <div className={styles.track} />
            <div
                ref={thumbRef}
                className={`${styles.thumb} ${isDragging ? styles.isDragging : ''}`}
                style={{ height: `${thumbHeight}px` }}
            />
        </div>
    );
}
