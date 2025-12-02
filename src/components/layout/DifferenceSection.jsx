import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './DifferenceSection.module.css';

const cards = [
    {
        id: 1,
        text: "GuideX gave me hope when I felt completely lost. The counselor I found truly understands me.",
        author: "Emily R.",
        role: "Anxiety Recovery",
        initials: "ER",
        color: "#e0f2fe" // Light Sky Blue
    },
    {
        id: 2,
        text: "I've never felt so supported. This platform made finding the right help incredibly easy and stress-free.",
        author: "Michael T.",
        role: "Stress Management",
        initials: "MT",
        color: "#dcfce7" // Light Green
    },
    {
        id: 3,
        text: "My life has changed for the better. The sessions are convenient, and the quality of care is outstanding.",
        author: "Sarah L.",
        role: "Depression Support",
        initials: "SL",
        color: "#f3e8ff" // Light Purple
    },
    {
        id: 4,
        text: "Finally, a service that prioritizes my mental well-being. I feel heard, validated, and stronger every day.",
        author: "David K.",
        role: "Personal Growth",
        initials: "DK",
        color: "#fef3c7" // Light Amber
    },
    {
        id: 5,
        text: "The best decision I made for my mental health. Connecting with a professional here was seamless and life-saving.",
        author: "Jessica M.",
        role: "Trauma Healing",
        initials: "JM",
        color: "#fce7f3" // Light Pink
    }
];

const Card = ({ data, index, scrollYProgress }) => {
    // Stagger the animation for each card
    // We divide the total scroll progress (0-1) into overlapping segments
    // Further reduced multiplier to 0.08 to significantly decrease space between cards
    const start = index * 0.08;
    const end = start + 0.5; // Adjusted duration for overlap

    const x = useTransform(
        scrollYProgress,
        [start, end],
        ['120vw', '-120vw'] // Move from right off-screen to left off-screen
    );

    // Create an arc motion: Start low (bottom), go high (center), end low (bottom)
    const y = useTransform(
        scrollYProgress,
        [start, start + 0.25, end],
        [300, 0, 300]
    );

    const rotate = useTransform(
        scrollYProgress,
        [start, start + 0.2, end],
        [15, 0, -15] // Increased rotation for more dynamic feel
    );

    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.1, end - 0.1, end],
        [0, 1, 1, 0] // Fade in/out at edges
    );

    return (
        <motion.div
            className={styles.card}
            style={{
                x,
                y,
                rotate,
                opacity,
                backgroundColor: data.color
            }}
        >
            <p className={styles.cardText}>{data.text}</p>
            <div className={styles.cardAuthor}>
                <div className={styles.avatar}>{data.initials}</div>
                <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{data.author}</span>
                    <span className={styles.authorRole}>{data.role}</span>
                </div>
            </div>
        </motion.div>
    );
};

const DifferenceSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className={styles.section}>
            <div className={styles.stickyContainer}>
                <h2 className={styles.heading}>
                    The <br />
                    GuideX <br />
                    Difference
                </h2>

                <div className={styles.cardContainer}>
                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            data={card}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DifferenceSection;
