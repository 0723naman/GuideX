import { motion } from 'framer-motion';
import { Calendar, Clock, User, Activity } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css';

const UserDashboard = () => {
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
                    <h1 className={styles.title}>User Dashboard</h1>
                    <p className={styles.subtitle}>Welcome back to GuideX</p>
                </motion.div>

                <motion.div className={styles.grid} variants={itemVariants}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Upcoming Sessions</h3>
                            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                                <Calendar size={24} />
                            </div>
                        </div>
                        <p className={styles.emptyState}>No upcoming sessions.</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>My Counselors</h3>
                            <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                                <User size={24} />
                            </div>
                        </div>
                        <p className={styles.emptyState}>You haven't connected with any counselors yet.</p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Recent Activity</h3>
                            <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                                <Activity size={24} />
                            </div>
                        </div>
                        <p className={styles.emptyState}>No recent activity.</p>
                    </div>
                </motion.div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
