import { useEffect, useState } from 'react';
import styles from './typewriter.module.css';

export function Typewriter({ text, speed = 100, className, ...rest }) {
    const [displayValue, setDisplayValue] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (isDeleting) {
            if (displayValue.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayValue(prev => prev.substring(0, prev.length - 1));
                }, speed / 2);
            } else {
                setIsDeleting(false);
            }
        } else {
            if (displayValue !== text) {
                if (text.startsWith(displayValue)) {
                    timeout = setTimeout(() => {
                        setDisplayValue(prev => prev + text.charAt(displayValue.length));
                    }, speed);
                } else {
                    setIsDeleting(true);
                }
            }
        }

        return () => clearTimeout(timeout);
    }, [displayValue, isDeleting, text, speed]);

    return (
        <span className={`${styles.text} ${className}`} {...rest}>
            <span className={styles.content}>{displayValue}</span>
            <span className={styles.cursor} aria-hidden="true" />
        </span>
    );
}
