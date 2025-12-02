import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

const UserSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            await authService.register({ ...formData, role: 'user' });
            toast.success('Account created successfully!');
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
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join as a User</p>
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
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>
                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <p className="auth-footer">
                        Want to be a counselor? <Link to="/counselor/signup">Apply here</Link>
                    </p>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default UserSignup;
