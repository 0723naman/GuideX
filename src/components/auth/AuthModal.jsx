import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Modal from '../ui/Modal';
import TermsModal from './TermsModal';
import styles from './AuthModal.module.css';

// Using the user-provided image from public folder
const SIDE_IMAGE = "/auth-image-2.jpg";

const AuthModal = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    // Password Logic States
    const [realPassword, setRealPassword] = useState('');
    const [visibleIndex, setVisibleIndex] = useState(-1);
    const [strength, setStrength] = useState('empty'); // empty, weak, medium, strong
    const [progress, setProgress] = useState(0); // 0 to 100
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const timeoutRef = useRef(null);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        // password field in formData will be synced with realPassword
        termsAccepted: false
    });

    // Cleanup timeout
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Measure input dimensions for SVG path
    useLayoutEffect(() => {
        if (containerRef.current) {
            const updateDimensions = () => {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            };

            updateDimensions();

            const observer = new ResizeObserver(updateDimensions);
            observer.observe(containerRef.current);

            return () => observer.disconnect();
        }
    }, [isOpen, isSignUp]); // Re-measure when modal opens or mode changes

    // Sync realPassword to formData and calculate strength/progress
    useEffect(() => {
        setFormData(prev => ({ ...prev, password: realPassword }));

        const len = realPassword.length;

        // Calculate Progress based on Length (Smooth filling)
        const newProgress = Math.min((len / 12) * 100, 100);

        // Calculate Strength based on Complexity
        let score = 0;
        if (len > 0) score++; // Has content
        if (len >= 8) score++; // Good length
        if (/[A-Z]/.test(realPassword)) score++; // Has uppercase
        if (/[0-9]/.test(realPassword)) score++; // Has number
        if (/[^A-Za-z0-9]/.test(realPassword)) score++; // Has symbol

        let newStrength = 'empty';

        if (len === 0) {
            newStrength = 'empty';
        } else if (score < 3) {
            newStrength = 'weak';
        } else if (score < 5) {
            newStrength = 'medium';
        } else {
            newStrength = 'strong';
        }

        setStrength(newStrength);
        setProgress(newProgress);
    }, [realPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        if (isSignUp) {
            // Save user to localStorage for demo purposes
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const newUser = {
                id: Date.now().toString(),
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                joinedAt: new Date().toISOString(),
                status: 'Active'
            };
            localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

            // Trigger storage event for realtime updates
            window.dispatchEvent(new Event('storage'));
        }

        onClose();
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handlePasswordChange = (e) => {
        const newValue = e.target.value;
        const newCursorPos = e.target.selectionStart;

        const diff = newValue.length - realPassword.length;

        let newRealPassword = realPassword;
        let newVisibleIndex = -1;

        if (diff > 0) {
            const addedChars = newValue.slice(newCursorPos - diff, newCursorPos);
            newRealPassword =
                realPassword.slice(0, newCursorPos - diff) +
                addedChars +
                realPassword.slice(newCursorPos - diff);

            if (diff === 1) {
                newVisibleIndex = newCursorPos - 1;
            }
        } else if (diff < 0) {
            newRealPassword =
                realPassword.slice(0, newCursorPos) +
                realPassword.slice(newCursorPos + Math.abs(diff));
        }

        setRealPassword(newRealPassword);
        setVisibleIndex(newVisibleIndex);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (newVisibleIndex !== -1) {
            timeoutRef.current = setTimeout(() => {
                setVisibleIndex(-1);
            }, 500);
        }
    };

    const getDisplayPassword = () => {
        return realPassword.split('').map((char, i) => {
            return i === visibleIndex ? char : '•';
        }).join('');
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 'weak': return '#ef4444';   // Red
            case 'medium': return '#f97316'; // Orange
            case 'strong': return '#22c55e'; // Green
            default: return 'transparent';
        }
    };

    // Generate path string starting from left-middle
    const getPathD = () => {
        const w = dimensions.width;
        const h = dimensions.height;
        if (w === 0 || h === 0) return '';

        const r = 25; // Radius matches border-radius (approx 50px/2 or 25px)
        // Adjust for stroke width (3px) -> inset by 1.5px
        const s = 1.5;

        // Start at Left Middle (0 + s, h/2)
        // Move up to top-left arc start
        // Arc top-left
        // Line to top-right arc start
        // Arc top-right
        // Line to bottom-right arc start
        // Arc bottom-right
        // Line to bottom-left arc start
        // Arc bottom-left
        // Line back to start

        return `
            M ${s} ${h / 2}
            L ${s} ${r}
            A ${r - s} ${r - s} 0 0 1 ${r} ${s}
            L ${w - r} ${s}
            A ${r - s} ${r - s} 0 0 1 ${w - s} ${r}
            L ${w - s} ${h - r}
            A ${r - s} ${r - s} 0 0 1 ${w - r} ${h - s}
            L ${r} ${h - s}
            A ${r - s} ${r - s} 0 0 1 ${s} ${h - r}
            Z
        `;
    };

    const toggleMode = () => setIsSignUp(!isSignUp);

    const GoogleIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    const FacebookIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
        </svg>
    );

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className={styles.modalWide} hideHeader={true}>
                <div className={styles.container}>
                    {/* Left Side - Image */}
                    <div className={styles.leftSide}>
                        <div className={styles.imageContainer}>
                            <img
                                src={SIDE_IMAGE}
                                alt="Visual"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.style.backgroundColor = '#000';
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className={styles.rightSide}>
                        {!isSignUp && (
                            <button className={styles.backButton} onClick={toggleMode}>
                                <ArrowLeft size={20} />
                            </button>
                        )}

                        <div className={styles.header}>
                            <h2 className={styles.title}>
                                {isSignUp ? 'Create an Account' : 'Welcome Back'}
                            </h2>
                            <p className={styles.subtitle}>
                                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                                <a onClick={toggleMode}>
                                    {isSignUp ? 'Log in' : 'Sign up'}
                                </a>
                            </p>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>First Name</label>
                                        <input
                                            className={styles.input}
                                            placeholder="John"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Last Name</label>
                                        <input
                                            className={styles.input}
                                            placeholder="Doe"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    className={styles.input}
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Password</label>
                                <div className={styles.inputWrapper} ref={containerRef}>
                                    <input
                                        ref={inputRef}
                                        className={`${styles.input} ${styles.passwordInput}`}
                                        type="text"
                                        placeholder="Password"
                                        name="password"
                                        value={getDisplayPassword()}
                                        onChange={handlePasswordChange}
                                        autoComplete="off"
                                    />
                                    {/* Animated SVG Border */}
                                    <svg className={styles.progressRing} width="100%" height="100%">
                                        {/* Animated Progress */}
                                        <path
                                            d={getPathD()}
                                            fill="none"
                                            stroke={getStrengthColor()}
                                            strokeWidth="3"
                                            pathLength="100"
                                            strokeDasharray="100"
                                            strokeDashoffset={100 - progress}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' }}
                                        />
                                    </svg>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                {isSignUp ? 'Create Account' : 'Log In'}
                            </button>

                            {isSignUp && (
                                <div className={styles.terms}>
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                    />
                                    <span>
                                        I agree to the <span className={styles.termsLink} onClick={() => setIsTermsOpen(true)}>Terms & Condition</span>
                                    </span>
                                </div>
                            )}
                        </form>

                        <div className={styles.divider}>or</div>

                        <div className={styles.socialButtons}>
                            <button className={styles.socialBtn}>
                                <GoogleIcon />
                                Continue with Google
                            </button>
                            <button className={styles.socialBtn}>
                                <FacebookIcon />
                                Continue with Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Terms Modal - Rendered outside the main modal but controlled here */}
            <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        </>
    );
};

export default AuthModal;
