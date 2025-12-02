import { motion } from 'framer-motion';
import { Users, UserCheck, Calendar, DollarSign, BarChart2, PieChart, Activity, FileText, Settings } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css';

const AdminDashboard = () => {
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
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.subtitle}>Platform Overview</p>
                </motion.div>

                {/* Platform Overview Grid */}
                <motion.div className={styles.grid} variants={itemVariants} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Total Users</span>
                                <div className={styles.statValue}>0</div>
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
                                <div className={styles.statValue}>0</div>
                            </div>
                            <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                                <UserCheck size={24} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <span className={styles.cardTitle}>Total Sessions</span>
                                <div className={styles.statValue}>0</div>
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
                        <div className={`${styles.card} ${styles.actionCard}`}>
                            <div className={`${styles.actionIcon} ${styles.iconBlue}`}>
                                <BarChart2 size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Counsellor Applications</h3>
                            <p className={styles.actionDesc}>Approve or Reject requests</p>
                        </div>

                        <div className={`${styles.card} ${styles.actionCard}`}>
                            <div className={`${styles.actionIcon} ${styles.iconPurple}`}>
                                <Users size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Manage Users</h3>
                            <p className={styles.actionDesc}>View and deactivate users</p>
                        </div>

                        <div className={`${styles.card} ${styles.actionCard}`}>
                            <div className={`${styles.actionIcon} ${styles.iconGreen}`}>
                                <UserCheck size={32} />
                            </div>
                            <h3 className={styles.actionTitle}>Manage Counsellors</h3>
                            <p className={styles.actionDesc}>Review counsellor verifications</p>
                        </div>

                        <div className={`${styles.card} ${styles.actionCard}`}>
                            <div className={`${styles.actionIcon} ${styles.iconGreen}`}>
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
                        <div className={styles.card} style={{ minHeight: '200px', justifyContent: 'center', alignItems: 'center' }}>
                            <Activity size={48} className="text-blue-500 mb-2" />
                            <h3 className={styles.actionTitle}>User Growth Trend</h3>
                        </div>
                        <div className={styles.card} style={{ minHeight: '200px', justifyContent: 'center', alignItems: 'center' }}>
                            <PieChart size={48} className="text-purple-500 mb-2" />
                            <h3 className={styles.actionTitle}>Counsellor Distribution</h3>
                        </div>
                        <div className={styles.card} style={{ minHeight: '200px', justifyContent: 'center', alignItems: 'center' }}>
                            <BarChart2 size={48} className="text-green-500 mb-2" />
                            <h3 className={styles.actionTitle}>Sessions Overview</h3>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
