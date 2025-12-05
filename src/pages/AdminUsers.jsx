import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Users will be fetched from actual source in future
        setUsers([]);
    }, []);

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <Link to="/dashboard/admin" className={styles.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className={styles.title}>Manage Users</h1>
                    <p className={styles.subtitle}>View and manage registered users</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {users.map((user) => (
                            <div key={user.id} className={styles.card} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1.5rem', color: '#a855f7', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                    {user.name.charAt(0)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{user.name}</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{user.email}</p>
                                </div>
                                <div className={styles.badge} style={{ background: '#f1f5f9', color: '#475569', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600 }}>
                                    {user.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminUsers;
