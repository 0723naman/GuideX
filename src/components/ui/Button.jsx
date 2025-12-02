import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', ...props }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
