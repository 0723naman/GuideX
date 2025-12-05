import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import styles from '../../pages/Dashboard.module.css';
import { MessageCircle, Calendar } from 'lucide-react';
import { applicationService } from '../../services/application.service';

const FindCounselorModal = ({ isOpen, onClose }) => {
    const [counsellors, setCounsellors] = useState([]);
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [bookingData, setBookingData] = useState({ date: '', time: '', reason: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadCounsellors();
            setSelectedCounselor(null);
            setShowSuccess(false);
            setBookingData({ date: '', time: '', reason: '' });
        }

        const handleStorageChange = (e) => {
            if (!e.key || e.key === 'counselor_applications') {
                loadCounsellors();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [isOpen]);

    const loadCounsellors = async () => {
        const approved = await applicationService.getApprovedApplications();
        setCounsellors(approved);
    };

    const handleBookClick = (counselor) => {
        setSelectedCounselor(counselor);
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();

        // Create booking object
        const newBooking = {
            id: Date.now().toString(),
            counselorId: selectedCounselor.id,
            counselorName: selectedCounselor.name,
            counselorSpecialization: selectedCounselor.specialization,
            counselorImage: selectedCounselor.image || null, // Assuming image might be available or null
            userId: 'current-user-id', // In a real app, get from auth context
            userName: 'Current User', // In a real app, get from auth context
            date: bookingData.date,
            time: bookingData.time,
            reason: bookingData.reason,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

        // Trigger storage event for real-time updates
        window.dispatchEvent(new Event('storage'));

        setShowSuccess(true);
        setTimeout(() => {
            onClose();
            setShowSuccess(false);
            setSelectedCounselor(null);
        }, 2000);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedCounselor ? `Book Session with ${selectedCounselor.name}` : "Find a Counsellor"}
            className={styles.modalWide}
            hideCloseButton={true}
        >
            <div style={{ padding: '1rem' }}>
                {!selectedCounselor ? (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: '#e0f2fe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#0ea5e9'
                            }}>
                                <MessageCircle size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>Connect with Experts</h3>
                            <p style={{ color: '#64748b' }}>
                                Browse our list of verified counselors and find the perfect match for your needs.
                            </p>
                        </div>

                        {counsellors.length === 0 ? (
                            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                                No counselors available at the moment.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {counsellors.map((counsellor) => (
                                    <div key={counsellor.id} className={styles.card} style={{ flexDirection: 'row', alignItems: 'center', padding: '1.5rem' }}>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1.5rem', color: '#0ea5e9', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                            {counsellor.name.charAt(0)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem', color: '#1e293b' }}>{counsellor.name}</h4>
                                            <p style={{ color: '#64748b', marginBottom: '0.25rem' }}>
                                                <span style={{ fontWeight: 500 }}>Specialization:</span> {counsellor.specialization}
                                            </p>
                                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                <span style={{ fontWeight: 500 }}>Experience:</span> {counsellor.experience} years
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleBookClick(counsellor)}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: '#0f172a',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '2rem',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Calendar size={18} />
                                            Book Session
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : showSuccess ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Calendar size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>Booking Confirmed!</h3>
                        <p style={{ color: '#64748b' }}>Your session has been successfully scheduled.</p>
                    </div>
                ) : (
                    <form onSubmit={handleBookingSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#1e293b' }}>Select Date</label>
                            <input
                                type="date"
                                required
                                value={bookingData.date}
                                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'white', color: '#334155', colorScheme: 'light' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#1e293b' }}>Select Time</label>
                            <input
                                type="time"
                                required
                                value={bookingData.time}
                                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'white', color: '#334155', colorScheme: 'light' }}
                            />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#1e293b' }}>Reason for Session</label>
                            <textarea
                                rows="4"
                                required
                                value={bookingData.reason}
                                onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                                placeholder="Briefly describe what you'd like to discuss..."
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', resize: 'vertical', background: 'white', color: '#334155' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => setSelectedCounselor(null)}
                                style={{ flex: 1, padding: '0.75rem', background: 'white', border: '1px solid #cbd5e1', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', color: '#64748b' }}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                style={{ flex: 1, padding: '0.75rem', background: '#0f172a', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', color: 'white' }}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default FindCounselorModal;
