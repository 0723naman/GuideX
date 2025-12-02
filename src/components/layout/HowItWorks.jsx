import styles from './HowItWorks.module.css';

const steps = [
    { number: '01', title: 'Sign Up', description: 'Create your account in seconds.' },
    { number: '02', title: 'Find a Counselor', description: 'Browse profiles and find your match.' },
    { number: '03', title: 'Book a Session', description: 'Schedule a time that works for you.' },
    { number: '04', title: 'Start Growing', description: 'Connect via video and achieve your goals.' },
];

const HowItWorks = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>How It Works</h2>
                <div className={styles.grid}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.number}>{step.number}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
