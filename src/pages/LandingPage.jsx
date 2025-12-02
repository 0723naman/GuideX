import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import DifferenceSection from '../components/layout/DifferenceSection';
import SpeedSection from '../components/layout/SpeedSection';
import StatsSection from '../components/layout/StatsSection';
import LogoMarquee from '../components/layout/LogoMarquee';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <LogoMarquee />
            <DifferenceSection />
            <StatsSection />
            <SpeedSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
