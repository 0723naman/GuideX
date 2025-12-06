import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import styles from './ContactUs.module.css';

const ContactUs = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I book a counseling session?",
            answer: "Booking a session is easy! Simply log in to your dashboard, browse our list of qualified counselors, select one that matches your needs, and choose a time slot that works for you."
        },
        {
            question: "Can I switch counselors if I'm not satisfied?",
            answer: "Absolutely. We believe that the right connection is key to success. You can switch counselors at any time through your dashboard settings without any hassle."
        },
        {
            question: "Is my personal information and session data secure?",
            answer: "Yes, your privacy is our top priority. All sessions are encrypted, and your personal data is stored securely in compliance with global data protection regulations."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit/debit cards, PayPal, and various digital wallets to ensure a smooth and secure transaction process."
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const formVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }
        }
    };

    const contactInfo = [
        {
            icon: <Mail />,
            title: "Email Us",
            desc: "hello@guidex.com",
            bgClass: styles.iconMail
        },
        {
            icon: <Phone />,
            title: "Call Us",
            desc: "+1 (555) 000-0000",
            bgClass: styles.iconPhone
        },
        {
            icon: <MapPin />,
            title: "Visit Us",
            desc: "123 Innovation Dr, Tech City",
            bgClass: styles.iconPin
        }
    ];

    return (
        <div className={styles.pageContainer}>
            <Navbar />

            {/* Animated Background Elements */}
            <div className={styles.backgroundShapes}>
                <div className={`${styles.shape} ${styles.shape1}`} />
                <div className={`${styles.shape} ${styles.shape2}`} />
                <div className={`${styles.shape} ${styles.shape3}`} />
            </div>

            <main className={styles.contentWrapper}>
                {/* Left Section: Info */}
                <motion.div
                    className={styles.infoSection}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span className={styles.eyebrow} variants={itemVariants}>
                        Get in Touch
                    </motion.span>

                    <motion.h1 className={styles.headline} variants={itemVariants}>
                        Let's Start a <br /> Conversation.
                    </motion.h1>

                    <motion.p className={styles.subheadline} variants={itemVariants}>
                        Have a question or just want to say hi? We'd love to hear from you.
                        Fill out the form and our team will get back to you within 24 hours.
                    </motion.p>

                    <div className={styles.contactCards}>
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                className={styles.contactCard}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={`${styles.iconWrapper} ${info.bgClass}`}>
                                    {info.icon}
                                </div>
                                <div className={styles.cardContent}>
                                    <h3>{info.title}</h3>
                                    <p>{info.desc}</p>
                                </div>
                                <ArrowRight size={20} color="#9ca3af" style={{ marginLeft: 'auto' }} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Section: Form */}
                <motion.div
                    className={styles.formSection}
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                >
                    <div className={styles.formContainer}>
                        <form>
                            <div className={styles.formGroup}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>First Name</label>
                                    <input type="text" className={styles.input} placeholder="John" required />
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Last Name</label>
                                    <input type="text" className={styles.input} placeholder="Doe" required />
                                </div>
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Email Address</label>
                                <input type="email" className={styles.input} placeholder="john@example.com" required />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Subject</label>
                                <input type="text" className={styles.input} placeholder="How can we help?" />
                            </div>

                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Message</label>
                                <textarea className={styles.textarea} placeholder="Tell us more about your inquiry..." required></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className={styles.submitBtn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                                <Send size={18} />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </main>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <motion.h2
                    className={styles.faqHeadline}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Frequently Asked <span>Questions</span>
                </motion.h2>

                <div className={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.faqItem} ${activeFaq === index ? styles.active : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className={styles.faqQuestion}>
                                <h3>{faq.question}</h3>
                                <div className={styles.faqIcon}>
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                            <div className={styles.faqAnswer}>
                                <div className={styles.answerContent}>
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div >
    );
};

export default ContactUs;
