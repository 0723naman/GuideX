import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';
import { SPECIALIZATIONS } from '../data/specializations';

const CounselorSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        experience: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.register({ ...formData, role: 'counselor' });
            toast.success('Application submitted successfully!');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="auth-container">
                <Card className="auth-card">
                    <h2 className="auth-title">Counselor Application</h2>
                    <p className="auth-subtitle">Join our expert network</p>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="form-group">
                            <label>Specialization</label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                required
                                className="select-input"
                            >
                                <option value="">Select Specialization</option>
                                {SPECIALIZATIONS.map((spec) => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Input
                            label="Years of Experience"
                            name="experience"
                            type="number"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Submitting...' : 'Apply Now'}
                        </Button>
                    </form>
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default CounselorSignup;
