import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import styles from './Hero.module.css';
import AuthModal from '../auth/AuthModal';

const Hero = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: 'easeOut' }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const imageAnimation = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: 'easeOut', delay: 0.4 }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Content */}
                <motion.div
                    className={styles.content}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h1
                        className={styles.heading}
                        variants={fadeInUp}
                    >
                        The smarter way to connect <br />
                        with trusted counselors
                    </motion.h1>

                    <motion.p
                        className={styles.subheading}
                        variants={fadeInUp}
                    >
                        Find verified experts approved by our team. Search, match, and get support effortlessly.
                    </motion.p>

                    <motion.div
                        className={styles.ctaButtons}
                        variants={fadeInUp}
                    >
                        <button
                            className={`${styles.button} ${styles.buttonPrimary}`}
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            Enter as User
                        </button>

                        <Link to="/dashboard/counselor" className={`${styles.button} ${styles.buttonSecondary}`}>
                            Enter as Counselor
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Image */}
                <motion.div
                    className={styles.imageSection}
                    initial="initial"
                    animate="animate"
                    variants={imageAnimation}
                >
                    <div className={styles.imageContainer}>
                        <img
                            src="/doctor-hero.png"
                            alt="Professional Counselor"
                            className={styles.image}
                        />
                    </div>
                </motion.div>
            </div>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </section>
    );
};

export default Hero;
