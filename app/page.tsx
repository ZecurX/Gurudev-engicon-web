import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Home Page - Main Landing Page
 * Gurudev Engicon Private Limited
 * 
 * This is the main page using Next.js App Router
 * Combines all section components into a single-page application
 * Uses both Server and Client Components for optimal performance
 */
export default function Home() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
