import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from '../../pages/Dashboard.module.css';
import { applicationService } from '../../services/application.service';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';

const ApplicationsModal = ({ isOpen, onClose }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (isOpen) {
            loadApplications();
        }

        const handleStorageChange = (e) => {
            if (e.key === 'counselor_applications') {
                loadApplications();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [isOpen]);

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
        <Modal isOpen={isOpen} onClose={onClose} title="Pending Applications" className={styles.modalWide}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
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
            </div>
        </Modal>
    );
};

export default ApplicationsModal;
