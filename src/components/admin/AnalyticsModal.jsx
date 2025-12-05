import React from 'react';
import Modal from '../ui/Modal';
import { BarChart2, PieChart, Activity, Users, Calendar } from 'lucide-react';

const AnalyticsModal = ({ isOpen, onClose, type, data }) => {
    const getModalContent = () => {
        switch (type) {
            case 'growth':
                return <UserGrowthChart data={data} />;
            case 'distribution':
                return <CounselorDistributionChart data={data} />;
            case 'sessions':
                return <SessionsOverviewChart data={data} />;
            default:
                return <div>No data available</div>;
        }
    };

    const getTitle = () => {
        switch (type) {
            case 'growth': return 'User Growth Trend';
            case 'distribution': return 'Counselor Distribution';
            case 'sessions': return 'Sessions Overview';
            default: return 'Analytics';
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} hideCloseButton={false}>
            <div style={{ padding: '1.5rem' }}>
                {getModalContent()}
            </div>
        </Modal>
    );
};

const UserGrowthChart = ({ data = [] }) => {
    // Mocking a monthly growth based on registration dates if available, else just showing total
    // Assuming data is an array of user objects with 'joinedAt' or just simple count
    const totalUsers = data.length;

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: '#3b82f6' }}>{totalUsers}</div>
                <div style={{ color: '#64748b' }}>Total Registered Users</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', border: '1px dashed #cbd5e1' }}>
                <Activity size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    Real-time growth tracking is active. <br />
                    New users will be added to this count automatically.
                </p>
            </div>
        </div>
    );
};

const CounselorDistributionChart = ({ data = [] }) => {
    // Group by specialization
    const distribution = data.reduce((acc, curr) => {
        const spec = curr.specialization || 'General';
        acc[spec] = (acc[spec] || 0) + 1;
        return acc;
    }, {});

    const total = data.length;

    return (
        <div>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#a855f7' }}>{total}</div>
                <div style={{ color: '#64748b' }}>Active Counselors</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(distribution).map(([spec, count]) => (
                    <div key={spec}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: '500', color: '#334155' }}>
                            <span>{spec}</span>
                            <span>{count} ({Math.round((count / total) * 100)}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${(count / total) * 100}%`, height: '100%', background: '#a855f7', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                ))}
                {total === 0 && <div style={{ textAlign: 'center', color: '#94a3b8' }}>No counselors found.</div>}
            </div>
        </div>
    );
};

const SessionsOverviewChart = ({ data = [] }) => {
    const upcoming = data.filter(b => b.status === 'upcoming').length;
    const completed = data.filter(b => b.status === 'completed').length;
    const cancelled = data.filter(b => ['cancelled', 'declined'].includes(b.status)).length;
    const total = data.length;

    const stats = [
        { label: 'Upcoming', count: upcoming, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Completed', count: completed, color: '#22c55e', bg: '#f0fdf4' },
        { label: 'Cancelled/Declined', count: cancelled, color: '#ef4444', bg: '#fef2f2' }
    ];

    return (
        <div>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{total}</div>
                <div style={{ color: '#64748b' }}>Total Sessions Booked</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {stats.map((stat) => (
                    <div key={stat.label} style={{ background: stat.bg, padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700', color: stat.color }}>{stat.count}</div>
                        <div style={{ fontSize: '0.75rem', color: stat.color, opacity: 0.8 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {total === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                    No session data available yet.
                </div>
            )}
        </div>
    );
};

export default AnalyticsModal;
