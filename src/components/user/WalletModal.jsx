import Modal from '../ui/Modal';
import styles from '../../pages/Dashboard.module.css';
import { Wallet } from 'lucide-react';

const WalletModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="My Wallet" className={styles.modalWide}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#f3e8ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: '#a855f7'
                }}>
                    <Wallet size={40} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Current Balance</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '2rem' }}>
                    ₹0.00
                </div>

                <button style={{
                    padding: '0.75rem 2rem',
                    background: '#0f172a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    Add Money
                </button>

                <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Transactions</h4>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', color: '#64748b', textAlign: 'center' }}>
                        No transactions yet.
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default WalletModal;
