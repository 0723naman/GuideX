import { useState, useEffect } from 'react';
import styles from '../../pages/Dashboard.module.css';
import Modal from '../ui/Modal';

const UsersModal = ({ isOpen, onClose }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // Users will be fetched from actual source in future
            setUsers([]);
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manage Users" className={styles.modalWide}>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {users.length === 0 ? (
                        <div className={styles.card} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                            <h3>No users found</h3>
                            <p>Registered users will appear here.</p>
                        </div>
                    ) : (
                        users.map((user) => (
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
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default UsersModal;
