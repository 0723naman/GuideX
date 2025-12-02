import styles from './Input.module.css';

const Input = ({ label, error, className, ...props }) => {
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`} {...props} />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
