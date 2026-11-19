import React from 'react';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import HeroSection from '../../sections/HeroSection.jsx';
import GallerySection from '../../sections/GallerySection.jsx';
import ServicesSection from '../../sections/ServicesSection.jsx';
import AboutSection from '../../sections/AboutSection.jsx';
import ProcessSection from '../../sections/ProcessSection.jsx';
import PricingSection from '../../sections/PricingSection.jsx';
import TestimonialsSection from '../../sections/TestimonialsSection.jsx';
import FAQSection from '../../sections/FAQSection.jsx';
import ContactSection from '../../sections/ContactSection.jsx';


export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
            {/* Fixed navigation */}
            <Navbar />

            {/* Page sections */}
            <main>
                <HeroSection />
                <GallerySection />
                <PricingSection />
                <AboutSection />
                <TestimonialsSection />
                <FAQSection />
                <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
