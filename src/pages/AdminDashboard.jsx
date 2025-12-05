import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Calendar, DollarSign, BarChart2, PieChart, Activity } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css';
import { applicationService } from '../services/application.service';
import ApplicationsModal from '../components/admin/ApplicationsModal';
import CounsellorsModal from '../components/admin/CounsellorsModal';
import UsersModal from '../components/admin/UsersModal';
import AnalyticsModal from '../components/admin/AnalyticsModal';

const AdminDashboard = () => {
    const [pendingApps, setPendingApps] = useState([]);
    const [approvedCounsellors, setApprovedCounsellors] = useState([]);
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeModal, setActiveModal] = useState(null); // 'applications', 'counsellors', 'users', 'analytics-growth', 'analytics-dist', 'analytics-sessions'

    useEffect(() => {
        loadData();

        const handleStorageChange = (e) => {
            if (e.key === 'counselor_applications' || e.key === 'users' || e.key === 'bookings') {
                loadData();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const loadData = async () => {
        const pending = await applicationService.getPendingApplications();
        const approved = await applicationService.getApprovedApplications();
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

        setPendingApps(pending);
        setApprovedCounsellors(approved);
        setUsers(storedUsers);
        setBookings(storedBookings);
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

    const getAnalyticsData = () => {
        if (activeModal === 'analytics-growth') return users;
        if (activeModal === 'analytics-dist') return approvedCounsellors;
        if (activeModal === 'analytics-sessions') return bookings;
        return [];
    };

    const getAnalyticsType = () => {
        if (activeModal === 'analytics-growth') return 'growth';
        if (activeModal === 'analytics-dist') return 'distribution';
        if (activeModal === 'analytics-sessions') return 'sessions';
        return '';
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
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.subtitle}>Platform Overview</p>
                </motion.div>

                {/* Platform Overview Grid */}
                <motion.div className={styles.grid} variants={itemVariants} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Total Users</span>
                                <div className={styles.statValue}>{users.length}</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                                <Users size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Total Counsellors</span>
                                <div className={styles.statValue}>{approvedCounsellors.length}</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                                <UserCheck size={24} />
                            </div>
                        </div>
                    </div>

                    <div
                        className={styles.card}
                        onClick={() => setActiveModal('applications')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Pending Requests</span>
                                <div className={styles.statValue}>{pendingApps.length}</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                                <Calendar size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Revenue</span>
                                <div className={styles.statValue}>₹0.00</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
                                <DollarSign size={24} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Admin Actions */}
                <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                    <h2 className={styles.sectionTitle}>Admin Actions</h2>
                    <div className={styles.grid}>


                        <div
                            className={`${styles.card} ${styles.actionCard}`}
                            onClick={() => setActiveModal('users')}
                        >
                            <div className={`${styles.actionIcon} ${styles.iconPurple}`}>
                                <Users size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Manage Users</h3>
                            <p className={styles.actionDesc}>View and deactivate users</p>
                        </div>

                        <div
                            className={`${styles.card} ${styles.actionCard}`}
                            onClick={() => setActiveModal('counsellors')}
                        >
                            <div className={`${styles.actionIcon} ${styles.iconGreen}`}>
                                <UserCheck size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Manage Counsellors</h3>
                            <p className={styles.actionDesc}>Review active counsellors</p>
                        </div>

                        <div className={`${styles.card} ${styles.actionCard}`}>
                            <div className={`${styles.actionIcon} ${styles.iconYellow}`}>
                                <DollarSign size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Transactions</h3>
                            <p className={styles.actionDesc}>Track wallet transactions</p>
                        </div>
                    </div>
                </motion.div>

                {/* Insights & Analytics */}
                <motion.div variants={itemVariants}>
                    <h2 className={styles.sectionTitle}>Insights & Analytics</h2>
                    <div className={styles.grid}>
                        <div
                            className={styles.card}
                            style={{ minHeight: '200px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => setActiveModal('analytics-growth')}
                        >
                            <div className={`${styles.iconWrapper} ${styles.iconBlue}`} style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Activity size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>User Growth Trend</h3>
                        </div>
                        <div
                            className={styles.card}
                            style={{ minHeight: '200px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => setActiveModal('analytics-dist')}
                        >
                            <div className={`${styles.iconWrapper} ${styles.iconPurple}`} style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '1rem' }}>
                                <PieChart size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Counsellor Distribution</h3>
                        </div>
                        <div
                            className={styles.card}
                            style={{ minHeight: '200px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => setActiveModal('analytics-sessions')}
                        >
                            <div className={`${styles.iconWrapper} ${styles.iconGreen}`} style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '1rem' }}>
                                <BarChart2 size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Sessions Overview</h3>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
            <Footer />

            {/* Modals */}
            <ApplicationsModal
                isOpen={activeModal === 'applications'}
                onClose={() => setActiveModal(null)}
            />
            <CounsellorsModal
                isOpen={activeModal === 'counsellors'}
                onClose={() => setActiveModal(null)}
            />
            <UsersModal
                isOpen={activeModal === 'users'}
                onClose={() => setActiveModal(null)}
            />
            <AnalyticsModal
                isOpen={activeModal && activeModal.startsWith('analytics-')}
                onClose={() => setActiveModal(null)}
                type={getAnalyticsType()}
                data={getAnalyticsData()}
            />
        </div>
    );
};

export default AdminDashboard;
