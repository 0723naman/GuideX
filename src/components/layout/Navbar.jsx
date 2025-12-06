import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, Sun, Moon, MessageCircle, LayoutDashboard } from 'lucide-react';
import Logo from '../ui/Logo';
import styles from './Navbar.module.css';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const lastScrollY = useRef(0);

    const isDashboard = false; // location.pathname.includes('/dashboard');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine visibility
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Determine background style
            if (currentScrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            lastScrollY.current = currentScrollY;
        };

        // Initial check
        if (window.scrollY > 20) {
            setIsScrolled(true);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'About Us', path: '/about-us' },
    ];

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${!isVisible ? styles.hidden : ''}`}>
                {/* Logo Section */}
                <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
                    <Logo />
                </Link>

                {/* Right Section */}
                <div className={styles.navButtons}>
                    {!isDashboard ? (
                        <>
                            {location.pathname !== '/about-us' && (
                                <Link to="/about-us" className={styles.cta}>
                                    About Us
                                </Link>
                            )}
                            {location.pathname !== '/contact-us' && (
                                <Link to="/contact-us" className={styles.cta}>
                                    Contact Us
                                </Link>
                            )}
                            {location.pathname !== '/dashboard/admin' && (
                                <Link to="/dashboard/admin" className={styles.cta}>
                                    Admin
                                </Link>
                            )}
                        </>
                    ) : (
                        // Authenticated Right Section
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <button className={styles.themeToggle} onClick={toggleTheme}>
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                            <div className={styles.profileSection}>
                                <div className={styles.profileAvatar}>R</div>
                                <span className={styles.profileName}>Raghav Sharma</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className={styles.hamburger} onClick={toggleMobileMenu}>
                    <Menu size={24} />
                </button>
            </nav>

            {/* Mobile Menu Backdrop */}
            <div
                className={`${styles.backdrop} ${isMobileMenuOpen ? styles.open : ''}`}
                onClick={closeMobileMenu}
            />

            {/* Mobile Menu Sidebar */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={closeMobileMenu}>
                    <X size={24} />
                </button>

                <div className={styles.mobileNav}>
                    {!isDashboard ? (
                        <>
                            {navLinks.map((link) => (
                                link.path !== location.pathname && (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={styles.mobileNavLink}
                                        onClick={closeMobileMenu}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}

                            {location.pathname !== '/contact-us' && (
                                <Link
                                    to="/contact-us"
                                    className={styles.mobileNavLink}
                                    style={{ color: '#0ea5e9', fontWeight: 600 }}
                                    onClick={closeMobileMenu}
                                >
                                    Contact Us
                                </Link>
                            )}

                            {location.pathname !== '/dashboard/admin' && (
                                <>
                                    <div style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}></div>
                                    <Link
                                        to="/dashboard/admin"
                                        className={styles.mobileNavLink}
                                        style={{ background: '#0b1120', color: 'white', textAlign: 'center' }}
                                        onClick={closeMobileMenu}
                                    >
                                        Admin
                                    </Link>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/chats" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                                Chats
                            </Link>
                            <Link to="/dashboard/user" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                                Dashboard
                            </Link>
                            <div style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}></div>
                            <div style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className={styles.profileAvatar}>R</div>
                                <span className={styles.profileName}>Raghav Sharma</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default Navbar;
