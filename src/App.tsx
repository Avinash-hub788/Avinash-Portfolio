import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import StartupIdeasSection from './components/StartupIdeasSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <StartupIdeasSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
