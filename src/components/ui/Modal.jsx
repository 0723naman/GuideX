import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, children, className, hideHeader }) => {
    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling on the body when modal is open
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                // Re-enable scrolling when modal closes
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    className={`${styles.modal} ${className || ''}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {!hideHeader && (
                        <div className={styles.header}>
                            <h2 className={styles.title}>{title}</h2>
                            <button className={styles.closeButton} onClick={onClose}>
                                &times;
                            </button>
                        </div>
                    )}
                    <div className={styles.content}>{children}</div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
