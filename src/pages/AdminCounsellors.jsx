import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './Dashboard.module.css';
import { applicationService } from '../services/application.service';

const AdminCounsellors = () => {
    const [counsellors, setCounsellors] = useState([]);
    const [selectedCounsellor, setSelectedCounsellor] = useState(null);

    useEffect(() => {
        loadCounsellors();
    }, []);

    const loadCounsellors = async () => {
        const approved = await applicationService.getApprovedApplications();
        setCounsellors(approved);
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <Link to="/dashboard/admin" className={styles.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1 className={styles.title}>Manage Counsellors</h1>
                    <p className={styles.subtitle}>View and manage active counsellors</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {counsellors.length === 0 ? (
                        <div className={styles.card} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                            <h3>No active counsellors</h3>
                            <p>Approved counsellors will appear here.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {counsellors.map((counsellor) => (
                                <motion.div
                                    key={counsellor.id}
                                    className={styles.card}
                                    style={{ flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCounsellor(counsellor)}
                                >
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1.5rem', color: '#0ea5e9', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                        {counsellor.name.charAt(0)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{counsellor.name}</h4>
                                        <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 500 }}>Specialization:</span> {counsellor.specialization}
                                        </p>
                                        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{counsellor.email}</p>
                                    </div>
                                    <div className={styles.badge} style={{ background: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600 }}>
                                        Verified
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Counselor Detail Modal */}
                <AnimatePresence>
                    {selectedCounsellor && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000,
                                backdropFilter: 'blur(4px)'
                            }}
                            onClick={() => setSelectedCounsellor(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                style={{
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '1rem',
                                    maxWidth: '500px',
                                    width: '90%',
                                    position: 'relative',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedCounsellor(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#64748b'
                                    }}
                                >
                                    <X size={24} />
                                </button>

                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0ea5e9', fontWeight: 'bold', fontSize: '2rem' }}>
                                        {selectedCounsellor.name.charAt(0)}
                                    </div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{selectedCounsellor.name}</h2>
                                    <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
                                        Verified Counselor
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Email</p>
                                        <p style={{ fontWeight: 500 }}>{selectedCounsellor.email}</p>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Specialization</p>
                                        <p style={{ fontWeight: 500 }}>{selectedCounsellor.specialization}</p>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                                        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Experience</p>
                                        <p style={{ fontWeight: 500 }}>{selectedCounsellor.experience} years</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default AdminCounsellors;
