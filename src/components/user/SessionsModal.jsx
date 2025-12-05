import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import styles from '../../pages/Dashboard.module.css';
import { Clock, Calendar, User } from 'lucide-react';
import { applicationService } from '../../services/application.service';

const SessionsModal = ({ isOpen, onClose, bookings = [], filter = 'all' }) => {
    const [counsellors, setCounsellors] = useState([]);

    useEffect(() => {
        if (isOpen) {
            loadCounsellors();
        }
    }, [isOpen]);

    const loadCounsellors = async () => {
        const approved = await applicationService.getApprovedApplications();
        setCounsellors(approved);
    };

    // Filter bookings
    const upcomingSessions = bookings.filter(b => b.status === 'upcoming');
    const historySessions = bookings.filter(b => ['pending', 'declined', 'completed'].includes(b.status));
    const completedSessions = bookings.filter(b => b.status === 'completed');

    const showUpcoming = filter === 'all' || filter === 'upcoming';
    const showHistory = filter === 'all' || filter === 'history';
    const showCompleted = filter === 'completed';

    const modalTitle = filter === 'upcoming' ? "Upcoming Sessions" : filter === 'completed' ? "Completed Sessions" : "My Sessions";
    const modalDesc = filter === 'upcoming'
        ? "Your confirmed upcoming appointments."
        : filter === 'completed'
            ? "Your completed sessions history."
            : "View your session history and status.";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} className={styles.modalWide} hideCloseButton={true}>
            <div style={{ padding: '1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#dcfce7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: '#166534'
                    }}>
                        <Clock size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>{modalTitle}</h3>
                    <p style={{ color: '#64748b' }}>
                        {modalDesc}
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                        No sessions found.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Section 1: Upcoming Sessions */}
                        {showUpcoming && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ background: '#e0f2fe', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>{upcomingSessions.length}</span>
                                    Upcoming Sessions
                                </h4>
                                {upcomingSessions.length === 0 ? (
                                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                                        No upcoming sessions scheduled.
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {upcomingSessions.map((booking) => (
                                            <SessionCard key={booking.id} booking={booking} counsellors={counsellors} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Section 2: My Sessions (History) */}
                        {showHistory && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#475569', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>{historySessions.length}</span>
                                    My Sessions
                                </h4>
                                {historySessions.length === 0 ? (
                                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                                        No session history found.
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {historySessions.map((booking) => (
                                            <SessionCard key={booking.id} booking={booking} counsellors={counsellors} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Section 3: Completed Sessions (Specific View) */}
                        {showCompleted && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ background: '#dcfce7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>{completedSessions.length}</span>
                                    Completed Sessions
                                </h4>
                                {completedSessions.length === 0 ? (
                                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                                        No completed sessions found.
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {completedSessions.map((booking) => (
                                            <SessionCard key={booking.id} booking={booking} counsellors={counsellors} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </Modal>
    );
};

const SessionCard = ({ booking, counsellors = [] }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return { bg: '#e0f2fe', text: '#0369a1', border: '#0ea5e9' };
            case 'pending': return { bg: '#fef3c7', text: '#d97706', border: '#f59e0b' };
            case 'completed': return { bg: '#dcfce7', text: '#166534', border: '#22c55e' };
            case 'declined': return { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' };
            case 'cancelled': return { bg: '#f1f5f9', text: '#64748b', border: '#94a3b8' };
            default: return { bg: '#f1f5f9', text: '#64748b', border: '#cbd5e1' };
        }
    };

    const colors = getStatusColor(booking.status);

    // Find counselor details if missing in booking
    const counselor = counsellors.find(c => c.id === booking.counselorId);
    const specialization = booking.counselorSpecialization || counselor?.specialization;
    const image = booking.counselorImage || counselor?.image;
    const name = booking.counselorName || counselor?.name || 'Unknown Counselor';

    return (
        <div className={styles.card} style={{ padding: '1.5rem', borderLeft: `4px solid ${colors.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', overflow: 'hidden' }}>
                        {image ? (
                            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>{name.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.25rem' }}>
                            Counselor: {name}
                        </h4>
                        {specialization && (
                            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>{specialization}</p>
                        )}
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Session ID: #{booking.id.slice(-6)}</p>
                    </div>
                </div>
                <div style={{
                    background: colors.bg,
                    color: colors.text,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                }}>
                    {booking.status === 'pending' ? 'Applied' : booking.status}
                </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
                        <Clock size={16} />
                        <span>{booking.time}</span>
                    </div>
                </div>
                <p style={{ color: '#475569', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    "{booking.reason}"
                </p>
            </div>

            {booking.status === 'upcoming' && (
                <button
                    onClick={() => window.open('https://meet.google.com/new', '_blank')}
                    style={{ width: '100%', padding: '0.5rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                >
                    Join Session
                </button>
            )}
        </div>
    );
};

export default SessionsModal;
