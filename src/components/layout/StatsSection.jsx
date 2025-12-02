import styles from './StatsSection.module.css';

const stats = [
    {
        value: "500",
        symbol: "+",
        label: "Trusted, verified counselors ready to help"
    },
    {
        value: "10k",
        symbol: "+",
        label: "Users seamlessly connected with experts"
    },
    {
        value: "100",
        symbol: "%",
        label: "Safety, verification, and quality ensured"
    },
    {
        value: "4.9",
        symbol: "/5",
        label: "Reliable, transparent, and effortless experience"
    }
];

const StatsSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <div className={styles.numberWrapper}>
                                <span className={styles.number}>{stat.value}</span>
                                {stat.symbol && <span className={styles.symbol}>{stat.symbol}</span>}
                            </div>
                            <p className={styles.label}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
