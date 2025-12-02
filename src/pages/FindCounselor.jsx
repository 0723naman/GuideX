import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { counselorService } from '../services/counselor.service';
import { SPECIALIZATIONS } from '../data/specializations';

const FindCounselor = () => {
    const [counselors, setCounselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        specialization: '',
    });

    useEffect(() => {
        const fetchCounselors = async () => {
            setLoading(true);
            try {
                // Mock data for now if API fails or returns empty
                const data = await counselorService.getAllCounselors(filters).catch(() => []);
                setCounselors(data);
            } catch (error) {
                console.error('Failed to fetch counselors', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounselors();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="content-container">
                <h1 className="page-title">Find a Counselor</h1>

                <div className="filters">
                    <Input
                        placeholder="Search by name..."
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                    />
                    <select
                        name="specialization"
                        value={filters.specialization}
                        onChange={handleFilterChange}
                        className="select-input"
                    >
                        <option value="">All Specializations</option>
                        {SPECIALIZATIONS.map((spec) => (
                            <option key={spec} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <p>Loading counselors...</p>
                ) : (
                    <div className="counselor-grid">
                        {counselors.length > 0 ? (
                            counselors.map((counselor) => (
                                <Card key={counselor.id} className="counselor-card">
                                    <h3>{counselor.name}</h3>
                                    <p className="specialization">{counselor.specialization}</p>
                                    <p className="experience">{counselor.experience} years experience</p>
                                    <Button>View Profile</Button>
                                </Card>
                            ))
                        ) : (
                            <p>No counselors found matching your criteria.</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default FindCounselor;
