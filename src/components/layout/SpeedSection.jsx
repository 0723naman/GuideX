import { Link } from 'react-router-dom';
import styles from './SpeedSection.module.css';

const SpeedSection = () => {
    // Generate lines for the fan effect
    const totalLines = 60;
    const lines = Array.from({ length: totalLines }, (_, i) => i);

    return (
        <section className={styles.section}>
            <div className={styles.backgroundWrapper}>

                <div className={styles.fanContainer}>
                    {lines.map((i) => {
                        const rotate = (i / totalLines) * 360;
                        return (
                            <div
                                key={i}
                                className={styles.line}
                                style={{
                                    rotate: `${rotate}deg`,
                                    transformOrigin: "top center",
                                    height: "35%", // Fixed height
                                    opacity: 0.3, // Fixed opacity
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.heading}>
                        15 minutes or <br className="md:hidden" />
                        less to find help
                    </h2>
                    <p className={styles.subtext}>
                        No more digging through endless directories. We connect you with verified counselors and therapists to match you with the right professional for your needs.
                    </p>
                    <div className={styles.buttonWrapper}>
                        <Link to="/about-us" className={styles.button}>
                            Learn More <span className={styles.arrow}>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpeedSection;
