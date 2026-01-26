import { useEffect, useState, useRef } from 'react';
import styles from './typewriter.module.css';

export function Typewriter({ text, speed = 100, delay = 1000, className }) {
    const [displayValue, setDisplayValue] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        let timer;

        const handleTyping = () => {
            if (isDeleting) {
                if (displayValue.length > 0) {
                    setDisplayValue(prev => prev.slice(0, -1));
                    timer = setTimeout(handleTyping, speed / 2);
                } else {
                    setIsDeleting(false);
                    timer = setTimeout(handleTyping, speed);
                }
            } else {
                if (displayValue.length < text.length) {
                    const nextChar = text.charAt(displayValue.length);
                    setDisplayValue(prev => prev + nextChar);
                    timer = setTimeout(handleTyping, speed);
                } else {
                    // Wait before deleting? 
                    // Actually, we rely on the parent changing the 'text' prop to trigger deletion?
                    // But if the parent switches text abruptly, we might want to animate the deletion of the OLD text first.
                    // However, simpler approach: The parent keeps the text stable for X seconds.
                    // We can just stay full.
                    // BUT: if 'text' changes, we should ideally delete the old one first?
                    // Or we can just start fresh. Let's look at the requirement.
                    // A typewriter usually types out. 
                    // If text prop changes, we should probably reset?
                    // Let's rely on the useEffect dependency on 'text'.
                }
            }
        };

        // Check if we need to delete existing text because prop changed
        if (text.startsWith(displayValue) && displayValue.length > 0 && text.length >= displayValue.length) {
            // We are typing the SAME text or extending it. Continue typing.
            if (displayValue !== text) {
                timer = setTimeout(handleTyping, speed);
            }
        } else {
            // Text changed significantly. If we have content, delete it first.
            if (displayValue.length > 0) {
                setIsDeleting(true);
                timer = setTimeout(handleTyping, speed / 2);
            } else {
                setIsDeleting(false);
                timer = setTimeout(handleTyping, speed);
            }
        }

        return () => clearTimeout(timer);
    }, [text, displayValue, isDeleting, speed]);

    // Re-think logic. 
    // We want: 
    // 1. Current text is A.
    // 2. Prop changes to B.
    // 3. Delete A char by char.
    // 4. Type B char by char.

    return (
        <span className={`${styles.text} ${className}`}>
            <span className={styles.content}>{displayValue}</span>
            <span className={styles.cursor} aria-hidden="true" />
        </span>
    );
}
