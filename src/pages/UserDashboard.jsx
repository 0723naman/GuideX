import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Wallet, MessageCircle, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './UserDashboard.module.css';
import FindCounselorModal from '../components/user/FindCounselorModal';
import SessionsModal from '../components/user/SessionsModal';
import WalletModal from '../components/user/WalletModal';

const UserDashboard = () => {
    const [activeModal, setActiveModal] = useState(null); // 'find', 'sessions', 'wallet'
    const [modalFilter, setModalFilter] = useState('all');
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({ upcoming: 0, completed: 0 });

    useEffect(() => {
        loadBookings();

        const handleStorageChange = (e) => {
            if (!e.key || e.key === 'bookings') {
                loadBookings();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const loadBookings = () => {
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        setBookings(allBookings);

        const upcoming = allBookings.filter(b => b.status === 'upcoming').length;
        const completed = allBookings.filter(b => b.status === 'completed').length;

        setStats({ upcoming, completed });
    };

    const openModal = (modalName, filter = 'all') => {
        setModalFilter(filter);
        setActiveModal(modalName);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.dashboardWrapper}>
                <motion.div
                    className={styles.dashboardContent}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div className={styles.header} variants={itemVariants}>
                        <h1 className={styles.title}>Dashboard</h1>
                        <p className={styles.subtitle}>Welcome back! Here's your mental health journey overview.</p>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div className={styles.statsGrid} variants={itemVariants}>
                        {/* Upcoming Sessions */}
                        <div
                            className={styles.statCard}
                            onClick={() => openModal('sessions', 'upcoming')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>Upcoming Sessions</span>
                                <span className={styles.statValue}>{stats.upcoming}</span>
                            </div>
                            <div className={`${styles.iconCircle} ${styles.blueBg}`}>
                                <Calendar size={24} className={styles.blueText} />
                            </div>
                        </div>

                        {/* Completed */}
                        <div
                            className={styles.statCard}
                            onClick={() => openModal('sessions', 'completed')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>Completed</span>
                                <span className={styles.statValue}>{stats.completed}</span>
                            </div>
                            <div className={`${styles.iconCircle} ${styles.greenBg}`}>
                                <TrendingUp size={24} className={styles.greenText} />
                            </div>
                        </div>

                        {/* Wallet Balance */}
                        <div className={styles.statCard}>
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>Wallet Balance</span>
                                <span className={styles.statValue}>₹0.00</span>
                                <button className={styles.addMoneyBtn} onClick={() => setActiveModal('wallet')}>Add Money →</button>
                            </div>
                            <div className={`${styles.iconCircle} ${styles.purpleBg}`}>
                                <Wallet size={24} className={styles.purpleText} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions Row */}
                    <motion.div className={styles.actionsGrid} variants={itemVariants}>
                        {/* Find Counsellor */}
                        <div
                            className={styles.actionCard}
                            onClick={() => setActiveModal('find')}
                        >
                            <div className={styles.actionIcon}>
                                <MessageCircle size={32} className={styles.blueText} />
                            </div>
                            <h3 className={styles.actionTitle}>Find Counsellor</h3>
                            <p className={styles.actionDesc}>Browse and connect with verified professionals</p>
                        </div>

                        {/* My Sessions */}
                        <div
                            className={styles.actionCard}
                            onClick={() => openModal('sessions', 'history')}
                        >
                            <div className={styles.actionIcon}>
                                <Clock size={32} className={styles.greenText} />
                            </div>
                            <h3 className={styles.actionTitle}>My Sessions</h3>
                            <p className={styles.actionDesc}>View all your past and upcoming sessions</p>
                        </div>

                        {/* Manage Wallet */}
                        <div
                            className={styles.actionCard}
                            onClick={() => setActiveModal('wallet')}
                        >
                            <div className={styles.actionIcon}>
                                <Wallet size={32} className={styles.purpleText} />
                            </div>
                            <h3 className={styles.actionTitle}>Manage Wallet</h3>
                            <p className={styles.actionDesc}>Add money and view transaction history</p>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
            <Footer />

            {/* Modals */}
            <FindCounselorModal
                isOpen={activeModal === 'find'}
                onClose={() => setActiveModal(null)}
            />
            <SessionsModal
                isOpen={activeModal === 'sessions'}
                onClose={() => setActiveModal(null)}
                bookings={bookings}
                filter={modalFilter}
            />
            <WalletModal
                isOpen={activeModal === 'wallet'}
                onClose={() => setActiveModal(null)}
            />
        </div>
    );
};

export default UserDashboard;
