import styles from './LogoMarquee.module.css';

const LogoMarquee = () => {
    const logos = [
        { name: 'NAMI', label: 'NAMI', rating: 'Non-profit' },
        { name: 'Mental Health America', label: 'MHA', rating: 'Non-profit' },
        { name: 'American Psychological Association', label: 'APA', rating: 'Association' },
        { name: 'Mayo Clinic', label: 'Mayo Clinic', rating: 'Hospital' },
        { name: 'Cleveland Clinic', label: 'Cleveland Clinic', rating: 'Hospital' },
        { name: 'Johns Hopkins', label: 'Johns Hopkins', rating: 'Hospital' },
        { name: 'McLean Hospital', label: 'McLean', rating: 'Hospital' },
        { name: 'BetterHelp', label: 'BetterHelp', rating: 'Partner' },
    ];

    // Duplicate logos for seamless scrolling
    const marqueeLogos = [...logos, ...logos, ...logos];

    return (
        <div className={styles.marqueeSection}>
            <div className={styles.container}>
                <p className={styles.label}>GuideX counselors are verified by</p>

                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {marqueeLogos.map((logo, index) => (
                            <div key={index} className={styles.logoItem}>
                                <span className={styles.logoText}>{logo.label}</span>
                                {logo.rating && (
                                    <span className={styles.ratingBadge}>{logo.rating}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoMarquee;
