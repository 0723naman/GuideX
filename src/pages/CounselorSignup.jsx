import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Globe, Clock, TrendingUp, Shield } from 'lucide-react';
import { applicationService } from '../services/application.service';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import { SPECIALIZATIONS } from '../data/specializations';
import styles from './CounselorSignup.module.css';

const CounselorSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialization: '',
        experience: '',
        hourlyRate: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await applicationService.submitApplication(formData);
            toast.success('Application submitted successfully! Please wait for admin approval.');
            navigate('/');
        } catch (error) {
            toast.error('Application failed');
        } finally {
            setLoading(false);
        }
    };

    const benefits = [
        {
            icon: <Clock size={24} className="text-blue-500" />,
            title: "Flexible Schedule",
            desc: "Set your own hours and work when it suits you best."
        },
        {
            icon: <Globe size={24} className="text-purple-500" />,
            title: "Global Reach",
            desc: "Connect with clients from around the world from home."
        },
        {
            icon: <TrendingUp size={24} className="text-green-500" />,
            title: "High Earnings",
            desc: "Competitive rates with transparent payment structure."
        }
    ];

    return (
        <div className={styles.pageContainer}>
            <Navbar />

            <div className={styles.contentWrapper}>
                <div className={styles.splitLayout}>
                    {/* Left Side - Hero */}
                    <motion.div
                        className={styles.heroSection}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className={styles.heroTitle}>
                            Shape the Future of <br />
                            <span className={styles.highlight}>Mental Wellness</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Join our curated network of top-tier counselors and make a real difference in people's lives while building your dream practice.
                        </p>

                        <div className={styles.benefitsGrid}>
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.benefitItem}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                >
                                    <div className={styles.iconBox}>
                                        {benefit.icon}
                                    </div>
                                    <div className={styles.benefitContent}>
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        className={styles.formSection}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <h2 className={styles.formTitle}>Apply Now</h2>
                                <p className={styles.formSubtitle}>Start your journey with GuideX</p>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.formGrid}>
                                <Input
                                    label="Full Name"
                                    name="name"
                                    placeholder="Dr. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Specialization</label>
                                    <select
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        required
                                        className={styles.select}
                                    >
                                        <option value="">Select Specialization</option>
                                        {SPECIALIZATIONS.map((spec) => (
                                            <option key={spec.id} value={spec.name}>
                                                {spec.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Input
                                    label="Hourly Rate (₹/hr)"
                                    name="hourlyRate"
                                    type="number"
                                    placeholder="e.g. 500"
                                    value={formData.hourlyRate}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Years of Experience"
                                    name="experience"
                                    type="number"
                                    placeholder="e.g. 5"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                />

                                <motion.button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? 'Submitting Application...' : 'Submit Application'}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CounselorSignup;
