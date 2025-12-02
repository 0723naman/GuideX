import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <nav className={styles.links}>
                        <Link to="/why-guidex" className={styles.link}>Why GuideX</Link>
                        <Link to="/counselor-resources" className={styles.link}>Counselor Resources</Link>
                        <Link to="/user-guides" className={styles.link}>User Guides</Link>
                        <Link to="/about" className={styles.link}>About Us</Link>
                        <Link to="/terms" className={styles.link}>Terms and Conditions</Link>
                        <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
                    </nav>

                    <div className={styles.rightContent}>
                        <h2 className={styles.heading}>
                            Complete support for <br />
                            every stage of your <br />
                            wellness journey
                        </h2>
                        <div className={styles.avatars}>
                            <div className={styles.avatar} style={{ backgroundColor: '#fca5a5' }}>JD</div>
                            <div className={styles.avatar} style={{ backgroundColor: '#86efac' }}>AS</div>
                            <div className={styles.avatar} style={{ backgroundColor: '#93c5fd' }}>MK</div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.logo}>
                        <Logo textClassName={styles.logoText} />
                    </div>

                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <Phone size={16} /> (555) 123-4567
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={16} /> contact@guidex.com
                        </div>
                        <div className={styles.contactItem}>
                            <MapPin size={16} /> New York, NY
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
