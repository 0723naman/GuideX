import { useState, useEffect, useRef } from 'react';
import Modal from '../ui/Modal';
import styles from '../../pages/Dashboard.module.css';
import { Calendar, Clock, User, Check, X, Video } from 'lucide-react';

const CounselorSessionsModal = ({ isOpen, onClose, bookings = [], onUpdate, filter = 'all' }) => {
    const [successMessage, setSuccessMessage] = useState(null);
    const upcomingSectionRef = useRef(null);

    // Reset success message when modal opens
    useEffect(() => {
        if (isOpen) {
            setSuccessMessage(null);
        }
    }, [isOpen]);

    // Filter bookings for display
    const activeBookings = bookings.filter(b => !['declined', 'cancelled'].includes(b.status));

    // Determine which sections to show based on filter
    const showPending = filter === 'all' || filter === 'pending';
    const showUpcoming = filter === 'all' || filter === 'upcoming';
    const showCompleted = filter === 'all' || filter === 'upcoming' || filter === 'completed';

    const pendingBookings = activeBookings.filter(b => b.status === 'pending');
    const upcomingBookings = activeBookings.filter(b => b.status === 'upcoming');
    const completedBookings = activeBookings.filter(b => b.status === 'completed');

    // Dynamic Title and Description
    const modalTitle = filter === 'pending' ? "Pending Requests" : filter === 'upcoming' ? "Booked Sessions" : filter === 'completed' ? "Completed Sessions" : "Manage Sessions";
    const modalDesc = filter === 'pending'
        ? "Review and take action on your new session requests."
        : filter === 'upcoming'
            ? "View your upcoming schedule and completed sessions."
            : filter === 'completed'
                ? "View your completed sessions history."
                : "Manage your pending requests and upcoming appointments.";

    const updateBookingStatus = (bookingId, newStatus) => {
        // 1. Update LocalStorage
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const newAllBookings = allBookings.map(b =>
            b.id === bookingId ? { ...b, status: newStatus } : b
        );
        localStorage.setItem('bookings', JSON.stringify(newAllBookings));

        // 2. Notify Parent to refresh data
        if (onUpdate) {
            onUpdate();
        }

        // 3. Dispatch event for other components (global sync)
        window.dispatchEvent(new Event('storage'));

        // Show success message
        if (newStatus === 'upcoming') {
            setSuccessMessage("Session accepted! Moved to Booked Sessions.");
            // Only scroll if we are showing upcoming section (i.e. not in pending-only mode)
            if (showUpcoming) {
                setTimeout(() => {
                    if (upcomingSectionRef.current) {
                        upcomingSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        } else if (newStatus === 'declined') {
            setSuccessMessage("Session request declined.");
        } else if (newStatus === 'cancelled') {
            setSuccessMessage("Session cancelled.");
        } else if (newStatus === 'completed') {
            setSuccessMessage("Session marked as completed.");
        }

        // Clear message after 3 seconds
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} className={styles.modalWide} hideCloseButton={true}>
            <div style={{ padding: '1rem' }}>
                {successMessage && (
                    <div style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        background: '#dcfce7',
                        color: '#166534',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        fontWeight: 600,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        {successMessage}
                    </div>
                )}

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
                        <Calendar size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>{modalTitle}</h3>
                    <p style={{ color: '#64748b' }}>
                        {modalDesc}
                    </p>
                </div>

                {activeBookings.length === 0 ? (
                    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                        No active sessions found.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Pending Requests Section */}
                        {showPending && pendingBookings.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#d97706', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ background: '#fef3c7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>{pendingBookings.length}</span>
                                    Pending Requests
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {pendingBookings.map(booking => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            onUpdateStatus={updateBookingStatus}
                                            isPending={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upcoming Sessions Section */}
                        {showUpcoming && upcomingBookings.length > 0 && (
                            <div ref={upcomingSectionRef}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0369a1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ background: '#e0f2fe', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>{upcomingBookings.length}</span>
                                    Upcoming Sessions
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {upcomingBookings.map(booking => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            onUpdateStatus={updateBookingStatus}
                                            isPending={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completed Sessions Section */}
                        {showCompleted && completedBookings.length > 0 && (
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ background: '#dcfce7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>{completedBookings.length}</span>
                                    Completed Sessions
                                </h4>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {completedBookings.map(booking => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            onUpdateStatus={updateBookingStatus}
                                            isPending={false}
                                            isCompleted={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty State for Specific Filters */}
                        {showPending && pendingBookings.length === 0 && filter === 'pending' && (
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                                No pending requests.
                            </div>
                        )}
                        {showUpcoming && upcomingBookings.length === 0 && completedBookings.length === 0 && filter === 'upcoming' && (
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                                No booked sessions.
                            </div>
                        )}

                    </div>
                )}
            </div>
        </Modal>
    );
};

const BookingCard = ({ booking, onUpdateStatus, isPending, isCompleted }) => (
    <div className={styles.card} style={{ padding: '1.5rem', borderLeft: isPending ? '4px solid #f59e0b' : isCompleted ? '4px solid #22c55e' : '4px solid #0ea5e9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                    <User size={24} />
                </div>
                <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.25rem' }}>{booking.userName}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Session ID: #{booking.id.slice(-6)}</p>
                </div>
            </div>
            <div style={{
                background: isPending ? '#fef3c7' : isCompleted ? '#dcfce7' : '#e0f2fe',
                color: isPending ? '#d97706' : isCompleted ? '#166534' : '#0369a1',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase'
            }}>
                {booking.status}
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

        <div style={{ display: 'flex', gap: '1rem' }}>
            {isPending ? (
                <>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'upcoming')}
                        style={{ flex: 1, padding: '0.5rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <Check size={18} /> Accept
                    </button>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'declined')}
                        style={{ flex: 1, padding: '0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <X size={18} /> Decline
                    </button>
                </>
            ) : isCompleted ? (
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                        Session Completed
                    </div>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'upcoming')}
                        style={{ padding: '0.5rem 1rem', background: 'white', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                        Mark Not Done
                    </button>
                </div>
            ) : (
                <>
                    <button style={{ flex: 1, padding: '0.5rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => window.open('https://meet.google.com/new', '_blank')}>
                        <Video size={18} /> Join Session
                    </button>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                        style={{ flex: 1, padding: '0.5rem', background: 'white', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'completed')}
                        style={{ flex: 1, padding: '0.5rem', background: 'white', color: '#166534', border: '1px solid #166534', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Mark Complete
                    </button>
                </>
            )}
        </div>
    </div>
);

export default CounselorSessionsModal;
