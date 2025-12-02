import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css'; // Reusing dashboard styles for consistency

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login:', { email, password });
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.dashboardContainer} style={{ maxWidth: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%' }}
                >
                    <div className={styles.header}>
                        <h1 className={styles.title}>Welcome Back</h1>
                        <p className={styles.subtitle}>Sign in to continue to GuideX</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--gray-700)' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--gray-300)',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--gray-700)' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--gray-300)',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                background: 'var(--primary-600)',
                                color: 'white',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Sign In <ArrowRight size={20} />
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--gray-500)' }}>
                        Don't have an account? <Link to="/signup/user" style={{ color: 'var(--primary-600)', fontWeight: '500' }}>Sign up</Link>
                    </p>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
