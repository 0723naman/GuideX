import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css';
import { applicationService } from '../services/application.service';
import toast from 'react-hot-toast';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();

        const handleStorageChange = (e) => {
            if (e.key === 'counselor_applications') {
                loadApplications();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const loadApplications = async () => {
        const pending = await applicationService.getPendingApplications();
        setApplications(pending);
    };

    const handleApprove = async (id) => {
        try {
            await applicationService.updateStatus(id, 'approved');
            toast.success('Application approved');
            loadApplications();
        } catch (error) {
            toast.error('Failed to approve application');
        }
    };

    const handleReject = async (id) => {
        try {
            await applicationService.updateStatus(id, 'rejected');
            toast.success('Application rejected');
            loadApplications();
        } catch (error) {
            toast.error('Failed to reject application');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <Link to="/dashboard/admin" className={styles.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className={styles.title}>Pending Applications</h1>
                    <p className={styles.subtitle}>Review and manage counselor applications</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {applications.length === 0 ? (
                        <div className={styles.card} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                            <h3>No pending applications</h3>
                            <p>All caught up! Check back later.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {applications.map((app) => (
                                <div key={app.id} className={styles.card} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{app.name}</h4>
                                        <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 500 }}>Specialization:</span> {app.specialization}
                                        </p>
                                        <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 500 }}>Experience:</span> {app.experience} years
                                        </p>
                                        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{app.email}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            onClick={() => handleApprove(app.id)}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '0.5rem',
                                                backgroundColor: '#dcfce7',
                                                color: '#166534',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            <Check size={20} /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(app.id)}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '0.5rem',
                                                backgroundColor: '#fee2e2',
                                                color: '#991b1b',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            <X size={20} /> Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminApplications;
