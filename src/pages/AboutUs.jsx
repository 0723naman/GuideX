import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Shield, Zap, Heart, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './AboutUs.module.css';

const AnimatedNumber = ({ value }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
    }, [springValue]);

    return <span ref={ref} />;
};

const AboutUs = () => {
    // Carousel State
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 4000); // Rotate every 4 seconds
        return () => clearInterval(interval);
    }, []);

    // Card Data
    const cards = [
        {
            id: 0,
            title: "100% Verified",
            text: "Every counselor is thoroughly vetted for your safety.",
            icon: <Shield size={32} color="#3b82f6" />,
            color: "blue"
        },
        {
            id: 1,
            title: "Instant Match",
            text: "AI-driven matching to find your perfect fit in seconds.",
            icon: <Zap size={32} color="#f59e0b" />,
            color: "amber"
        },
        {
            id: 2,
            title: "Safe Space",
            text: "A secure, confidential environment for your healing journey.",
            icon: <Heart size={32} color="#ec4899" />,
            color: "pink"
        }
    ];

    // Calculate position based on active index
    const getPosition = (index) => {
        const diff = (index - activeIndex + 3) % 3;
        if (diff === 0) return "center";
        if (diff === 1) return "right";
        return "left";
    };

    const variants = {
        center: {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 3,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: "easeInOut" }
        },
        right: {
            x: 180,
            y: -20,
            scale: 0.85,
            zIndex: 1,
            opacity: 0.6,
            filter: "blur(1px)",
            transition: { duration: 0.8, ease: "easeInOut" }
        },
        left: {
            x: -180,
            y: -20,
            scale: 0.85,
            zIndex: 1,
            opacity: 0.6,
            filter: "blur(1px)",
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Redesigned Hero Section - Carousel Animation */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={styles.contentWrapper}
                    >
                        <h1 className={styles.heroTitle}>
                            Redefining Mental <br />
                            Health Support
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Bridging the gap between you and the right care with speed,
                            trust, and complete transparency. Experience the future of counseling.
                        </p>
                    </motion.div>

                    {/* Right Visuals - Carousel Cards */}
                    <div className={styles.cardsWrapper}>
                        {cards.map((card, index) => {
                            const position = getPosition(index);
                            return (
                                <motion.div
                                    key={card.id}
                                    className={styles.glassCard}
                                    variants={variants}
                                    initial="center"
                                    animate={position}
                                    whileHover={{ scale: position === 'center' ? 1.05 : 0.85 }}
                                >
                                    <div className={styles.cardIcon}>
                                        {card.icon}
                                    </div>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <p className={styles.cardText}>{card.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission Section - Centered & Reduced */}
            <section className={styles.missionSection}>
                <div className={styles.container} style={{ display: 'block', maxWidth: '1000px', textAlign: 'center' }}>
                    <div className={styles.missionContent}>
                        <h3 className={styles.missionSubtitle}>Our Mission</h3>
                        <h2 className={styles.missionTitle}>
                            Simple, smart, and <br />
                            <strong>secure counseling.</strong>
                        </h2>
                        <div className={styles.missionText}>
                            <p>
                                We believe finding help shouldn't be harder than the struggle itself.
                                GuideX connects you with verified experts instantly, so you can focus on healing.
                            </p>
                        </div>
                    </div>

                    {/* Expanded Floating Visuals */}
                    <div className={styles.missionVisuals}>
                        <div className={styles.floatingContainer}>
                            {/* Large Floating Emojis scattered widely */}
                            <motion.div
                                animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className={`${styles.floatingEmoji} ${styles.emoji1}`}
                            >
                                💙
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className={`${styles.floatingEmoji} ${styles.emoji2}`}
                            >
                                ✨
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -25, 0], rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className={`${styles.floatingEmoji} ${styles.emoji3}`}
                            >
                                🛡️
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className={`${styles.floatingEmoji} ${styles.emoji4}`}
                            >
                                🧠
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
                                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className={`${styles.floatingEmoji} ${styles.emoji5}`}
                            >
                                🌿
                            </motion.div>

                            {/* Floating Text Words */}
                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className={`${styles.floatingText} ${styles.text1}`}
                            >
                                Empathy
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className={`${styles.floatingText} ${styles.text2}`}
                            >
                                Growth
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className={`${styles.floatingText} ${styles.text3}`}
                            >
                                Trust
                            </motion.div>

                            {/* Center "Cool" Text */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className={styles.visualText}
                            >
                                <span className={styles.visualTextGradient}>Healing</span>
                                <br />
                                Starts Here
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.statsContainer}>
                    <div className="flex flex-col items-center text-center">
                        <div className={styles.statNumber}>
                            <AnimatedNumber value={15000} />+
                        </div>
                        <div className="text-gray-500 text-lg">Matches Made</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className={styles.statNumber}>
                            <AnimatedNumber value={50} />
                        </div>
                        <div className="text-gray-500 text-lg">Active States</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className={styles.statNumber}>
                            <AnimatedNumber value={40} />+
                        </div>
                        <div className="text-gray-500 text-lg">Specialties Covered</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className={styles.statNumber}>
                            <AnimatedNumber value={98} />%
                        </div>
                        <div className="text-gray-500 text-lg">Client Satisfaction</div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className={styles.valuesContainer}>
                    <div className={styles.valuesGrid}>
                        <div>
                            <div className="sticky top-24">
                                <h2 className="text-5xl font-bold text-slate-900 mb-6">You heal. We help.</h2>
                                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                    Clients and counselors deserve straightforward experiences that
                                    save time and reduce stress. That belief shapes everything we do.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-12">
                            {/* Value Items */}
                            <div className="flex flex-col gap-4">
                                <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                    <Shield className="w-8 h-8 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">Trust</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Every counselor on our platform is thoroughly vetted. We verify
                                        licenses and background checks so you can focus on your well-being.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                    <CheckCircle className="w-8 h-8 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">Clarity</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        We believe in transparent pricing and clear processes. No hidden
                                        fees or confusing insurance jargon.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                    <Zap className="w-8 h-8 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">Efficiency</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        You shouldn't have to play phone tag to get an appointment.
                                        Our smart matching system connects you with available providers instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
