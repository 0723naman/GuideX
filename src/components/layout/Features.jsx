import styles from './Features.module.css';
import { Shield, Users, Video, Calendar } from 'lucide-react';

const features = [
    {
        icon: <Users size={32} />,
        title: 'Expert Counselors',
        description: 'Connect with verified professionals in various fields.',
    },
    {
        icon: <Video size={32} />,
        title: 'Video Sessions',
        description: 'High-quality video calls for seamless communication.',
    },
    {
        icon: <Calendar size={32} />,
        title: 'Easy Scheduling',
        description: 'Book sessions at your convenience with our smart calendar.',
    },
    {
        icon: <Shield size={32} />,
        title: 'Secure & Private',
        description: 'Your data and conversations are fully encrypted and private.',
    },
];

const Features = () => {
    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <h2 className={styles.title}>Why Choose GuideX?</h2>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
