import { motion } from 'framer-motion';
import { Calendar, Users, DollarSign, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';
import styles from './Dashboard.module.css';

const CounselorDashboard = () => {
    const { user } = useAuth();

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
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Pending</span>
                                <div className={styles.statValue}>0</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                                <Calendar size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Completed</span>
                                <div className={styles.statValue}>0</div>
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

                {/* Recent Sessions */}
                <motion.div variants={itemVariants}>
                    <div className={styles.sectionTitle}>
                        Recent Sessions
                    </div>
                    <div className={styles.listContainer}>
                        <p className={styles.emptyState}>No recent sessions</p>
                    </div>
                </motion.div>

            </motion.div>
            <Footer />
        </div>
    );
};

export default CounselorDashboard;
