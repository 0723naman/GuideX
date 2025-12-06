import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ArrowLeft, User, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import TermsModal from './TermsModal';
import styles from './AuthModal.module.css';

// Using the user-provided image from public folder
const SIDE_IMAGE = "/auth-image-2.jpg";

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [view, setView] = useState('selection'); // 'selection', 'auth' (User), 'counselor-mode' (Login/Signup selection), 'counselor-login'
    const [isSignUp, setIsSignUp] = useState(true);
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    // Password Logic States (Common for User Signup)
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
        // password synonymous with realPassword
        termsAccepted: false
    });

    // For Counselor Login - Name only
    const [counselorName, setCounselorName] = useState('');

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setView('selection');
            setIsSignUp(true);
            setRealPassword('');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                termsAccepted: false
            });
            setCounselorName('');
            setError('');
        }
    }, [isOpen]);

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
    }, [isOpen, isSignUp, view]); // Re-measure when modal mode changes

    // Sync realPassword to local state (User flow)
    useEffect(() => {
        if (view === 'auth') {
            setFormData(prev => ({ ...prev, password: realPassword }));
            updatePasswordStrength(realPassword);
        }
    }, [realPassword, view]);

    const updatePasswordStrength = (password) => {
        const len = password.length;
        const newProgress = Math.min((len / 12) * 100, 100);

        let score = 0;
        if (len > 0) score++;
        if (len >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let newStrength = 'empty';
        if (len === 0) newStrength = 'empty';
        else if (score < 3) newStrength = 'weak';
        else if (score < 5) newStrength = 'medium';
        else newStrength = 'strong';

        setStrength(newStrength);
        setProgress(newProgress);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (view === 'auth') {
            handleUserAuth();
        } else if (view === 'counselor-login') {
            handleCounselorLogin();
        }
    };

    const handleUserAuth = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

        if (isSignUp) {
            // User Signup
            if (existingUsers.some(u => u.email === formData.email)) {
                setError('Account already exists. Please log in.');
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: realPassword,
                joinedAt: new Date().toISOString(),
                status: 'Active'
            };
            localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
            window.dispatchEvent(new Event('storage'));
            navigate('/dashboard/user');
            onClose();
        } else {
            // User Login
            const user = existingUsers.find(u => u.email === formData.email && u.password === realPassword);
            if (user) {
                navigate('/dashboard/user');
                onClose();
            } else {
                const emailExists = existingUsers.some(u => u.email === formData.email);
                setError(emailExists ? 'Wrong credentials. Please try again.' : "Account doesn't exist. Please sign up.");
            }
        }
    };

    const handleCounselorLogin = () => {
        const applications = JSON.parse(localStorage.getItem('counselor_applications') || '[]');
        const counselor = applications.find(
            app => app.name.toLowerCase() === counselorName.trim().toLowerCase()
        );

        if (!counselor) {
            setError('Counselor not found. Please check the name.');
            return;
        }

        if (counselor.status === 'approved') {
            navigate('/dashboard/counselor');
            onClose();
        } else if (counselor.status === 'pending') {
            setError('Your application is still under review by the admin.');
        } else if (counselor.status === 'rejected') {
            setError('Your application has been rejected.');
        }
    };

    const handlePasswordChange = (e) => {
        const newValue = e.target.value;
        const newCursorPos = e.target.selectionStart;
        const diff = newValue.length - realPassword.length;

        let newRealPassword = realPassword;
        let newVisibleIndex = -1;

        if (diff > 0) {
            const addedChars = newValue.slice(newCursorPos - diff, newCursorPos);
            newRealPassword = realPassword.slice(0, newCursorPos - diff) + addedChars + realPassword.slice(newCursorPos - diff);
            if (diff === 1) newVisibleIndex = newCursorPos - 1;
        } else if (diff < 0) {
            newRealPassword = realPassword.slice(0, newCursorPos) + realPassword.slice(newCursorPos + Math.abs(diff));
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
        return realPassword.split('').map((char, i) => i === visibleIndex ? char : '•').join('');
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 'weak': return '#ef4444';
            case 'medium': return '#f97316';
            case 'strong': return '#22c55e';
            default: return 'transparent';
        }
    };

    // SVG Path Generator
    const getPathD = () => {
        const w = dimensions.width;
        const h = dimensions.height;
        if (w === 0 || h === 0) return '';
        const r = 25;
        const s = 1.5;
        // Start Left Middle -> Top Left Arc -> Top Right Arc -> Bottom Right Arc -> Bottom Left Arc -> End
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
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.04-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    const FacebookIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
        </svg>
    );

    const renderCounselorSelection = () => (
        <div className={styles.selectionContainer}>
            <button className={styles.backButton} onClick={() => setView('selection')}>
                <ArrowLeft size={20} />
            </button>
            <div className={styles.header}>
                <h2 className={styles.title}>Counselor Portal</h2>
                <p className={styles.subtitle}>Join as an expert or log in to your dashboard</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                <button
                    className={styles.submitBtn}
                    onClick={() => setView('counselor-login')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                    Log In
                </button>
                <button
                    className={styles.socialBtn}
                    onClick={() => { onClose(); navigate('/signup/counselor'); }}
                    style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '500', justifyContent: 'center' }}
                >
                    Sign Up as Counselor
                </button>
            </div>
        </div>
    );

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className={styles.modalWide} hideHeader={true}>
                <div className={styles.container}>
                    {/* Left Side */}
                    <div className={styles.leftSide}>
                        <div className={styles.imageContainer}>
                            <img
                                src={SIDE_IMAGE}
                                alt="Visual"
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#000'; }}
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className={styles.rightSide}>
                        {view === 'selection' && (
                            <div className={styles.selectionContainer}>
                                <div className={styles.header}>
                                    <h2 className={styles.title}>Welcome to GuideX</h2>
                                    <p className={styles.subtitle}>Choose how you want to continue</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                                    <button
                                        className={styles.submitBtn}
                                        onClick={() => { setView('auth'); setIsSignUp(true); }}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                    >
                                        <User size={20} /> Enter as User
                                    </button>
                                    <button
                                        className={styles.socialBtn}
                                        onClick={() => setView('counselor-mode')}
                                        style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                    >
                                        <Stethoscope size={20} /> Enter as Counselor
                                    </button>
                                </div>
                            </div>
                        )}

                        {view === 'counselor-mode' && renderCounselorSelection()}

                        {(view === 'auth' || view === 'counselor-login') && (
                            <>
                                <button
                                    className={styles.backButton}
                                    onClick={() => setView(view === 'counselor-login' ? 'counselor-mode' : 'selection')}
                                >
                                    <ArrowLeft size={20} />
                                </button>

                                <div className={styles.header}>
                                    <h2 className={styles.title}>
                                        {view === 'counselor-login' ? 'Counselor Login' : (isSignUp ? 'Create an Account' : 'Welcome Back')}
                                    </h2>
                                    <p className={styles.subtitle}>
                                        {view === 'counselor-login'
                                            ? 'Enter your name to access your dashboard'
                                            : (isSignUp ? 'Already have an account? ' : "Don't have an account? ")
                                        }
                                        {view === 'auth' && (
                                            <a onClick={toggleMode} style={{ cursor: 'pointer', color: '#2563eb' }}>
                                                {isSignUp ? 'Log in' : 'Sign up'}
                                            </a>
                                        )}
                                    </p>
                                </div>

                                <form className={styles.form} onSubmit={handleSubmit}>
                                    {error && (
                                        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' }}>
                                            {error}
                                        </div>
                                    )}

                                    {view === 'auth' && isSignUp && (
                                        <div className={styles.row}>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>First Name</label>
                                                <input className={styles.input} placeholder="John" name="firstName" value={formData.firstName} onChange={handleChange} />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Last Name</label>
                                                <input className={styles.input} placeholder="Doe" name="lastName" value={formData.lastName} onChange={handleChange} />
                                            </div>
                                        </div>
                                    )}

                                    {view === 'counselor-login' ? (
                                        <div className={styles.inputGroup}>
                                            <label className={styles.label}>Full Name</label>
                                            <input
                                                className={styles.input}
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={counselorName}
                                                onChange={(e) => setCounselorName(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <>
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
                                                    {/* Show Progress Ring only for User Signup */}
                                                    {view === 'auth' && isSignUp && (
                                                        <svg className={styles.progressRing} width="100%" height="100%">
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
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <button type="submit" className={styles.submitBtn}>
                                        {view === 'counselor-login' ? 'Log In' : (isSignUp ? 'Create Account' : 'Log In')}
                                    </button>

                                    {view === 'auth' && isSignUp && (
                                        <div className={styles.terms}>
                                            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                                            <span>I agree to the <span className={styles.termsLink} onClick={() => setIsTermsOpen(true)}>Terms & Condition</span></span>
                                        </div>
                                    )}
                                </form>

                                {/* Social Login - Only for Users */}
                                {view === 'auth' && (
                                    <>
                                        <div className={styles.divider}>or</div>
                                        <div className={styles.socialButtons}>
                                            <button className={styles.socialBtn}><GoogleIcon /> Continue with Google</button>
                                            <button className={styles.socialBtn}><FacebookIcon /> Continue with Facebook</button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Modal>

            <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        </>
    );
};

export default AuthModal;
