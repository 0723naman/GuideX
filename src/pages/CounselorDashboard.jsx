import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, DollarSign, Star, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import styles from './Dashboard.module.css';
import CounselorSessionsModal from '../components/counselor/CounselorSessionsModal';

const CounselorDashboard = () => {
    const { user } = useAuth();
    const [activeModal, setActiveModal] = useState(null);
    const [stats, setStats] = useState({ pending: 0, completed: 0 });
    const [bookedSessions, setBookedSessions] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [modalFilter, setModalFilter] = useState('all');

    useEffect(() => {
        calculateStats();

        const handleStorageChange = (e) => {
            if (!e.key || e.key === 'bookings') {
                calculateStats();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const calculateStats = () => {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        setAllBookings(bookings);

        const pending = bookings.filter(b => b.status === 'pending').length;
        const completed = bookings.filter(b => b.status === 'completed').length;
        const upcoming = bookings.filter(b => b.status === 'upcoming');

        setStats({ pending, completed });
        setBookedSessions(upcoming);
    };

    const openModal = (view) => {
        setModalFilter(view);
        setActiveModal('sessions');
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
            <motion.div
                className={styles.dashboardContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className={styles.header} variants={itemVariants}>
                    <h1 className={styles.title}>Counselor Dashboard</h1>
                    <p className={styles.subtitle}>Welcome back, {user?.name || 'Counselor'}</p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div className={styles.grid} variants={itemVariants} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    <div className={styles.card} onClick={() => openModal('pending')} style={{ cursor: 'pointer' }}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Pending</span>
                                <div className={styles.statValue}>{stats.pending}</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                                <Calendar size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card} onClick={() => openModal('completed')} style={{ cursor: 'pointer' }}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Completed</span>
                                <div className={styles.statValue}>{stats.completed}</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                                <Users size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Total Earnings</span>
                                <div className={styles.statValue}>₹0.00</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                                <DollarSign size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Rating</span>
                                <div className={styles.statValue}>0.0</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
                                <Star size={24} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Booked Sessions List */}
                <motion.div variants={itemVariants}>
                    <div className={styles.sectionTitle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            Booked Sessions
                            <span style={{
                                background: 'white',
                                color: '#0f172a',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                fontSize: '0.875rem',
                                fontWeight: 600
                            }}>
                                {bookedSessions.length}
                            </span>
                        </div>
                        <span
                            className={styles.viewAll}
                            onClick={() => openModal('upcoming')}
                        >
                            View All
                        </span>
                    </div>

                    <div className={styles.listContainer} style={{ textAlign: 'left', padding: '0' }}>
                        {bookedSessions.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center' }}>
                                <p className={styles.emptyState}>No upcoming sessions scheduled.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '1px', background: '#e2e8f0' }}>
                                {bookedSessions.slice(0, 5).map(booking => (
                                    <div
                                        key={booking.id}
                                        onClick={() => openModal('upcoming')}
                                        style={{
                                            background: 'white',
                                            padding: '1.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                    >
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: '#e0f2fe',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#0369a1',
                                                fontWeight: 600
                                            }}>
                                                {booking.userName.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.25rem' }}>{booking.userName}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                                                    <Calendar size={14} />
                                                    <span>{booking.date}</span>
                                                    <Clock size={14} style={{ marginLeft: '0.5rem' }} />
                                                    <span>{booking.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            background: '#e0f2fe',
                                            color: '#0369a1',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}>
                                            UPCOMING
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

            </motion.div>
            <Footer />

            <CounselorSessionsModal
                isOpen={activeModal === 'sessions'}
                onClose={() => setActiveModal(null)}
                bookings={allBookings}
                onUpdate={calculateStats}
                filter={modalFilter}
            />
        </div>
    );
};

export default CounselorDashboard;
