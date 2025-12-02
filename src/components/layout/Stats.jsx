import styles from './Stats.module.css';

const stats = [
    { value: '10k+', label: 'Active Users' },
    { value: '500+', label: 'Expert Counselors' },
    { value: '50k+', label: 'Sessions Completed' },
    { value: '4.9/5', label: 'Average Rating' },
];

const Stats = () => {
    return (
        <section className={styles.stats}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.value}>{stat.value}</div>
                            <div className={styles.label}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
