import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import Logo from '../ui/Logo';
import styles from './Navbar.module.css';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20 || location.pathname.includes('/dashboard')) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Initial check
        if (location.pathname.includes('/dashboard')) {
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
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
                {/* Logo Section */}
                <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={styles.navLink}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className={styles.navButtons}>
                    <Link to="/dashboard/admin" className={styles.cta}>
                        Admin
                    </Link>
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
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}></div>
                    <Link
                        to="/dashboard/admin"
                        className={styles.mobileNavLink}
                        style={{ background: '#0b1120', color: 'white', textAlign: 'center' }}
                        onClick={closeMobileMenu}
                    >
                        Admin
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Navbar;
