import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import PackagesPage from './pages/PackagesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TourDetailsPage from './pages/TourDetailsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <CartDrawer />
        <div className="min-h-screen bg-white selection:bg-brand-teal selection:text-white overflow-x-hidden font-sans">
          <SEO 
            title="Jandy Tours | Tu Aventura Premium en Venezuela"
            description="Especialistas en ecoturismo y viajes de lujo por toda Venezuela desde 2010. Descubre Los Roques, Canaima, Salto Ángel y más con expertos locales."
            image="/salto_angel.png"
            keywords="jandy tours, venezuela, viajes, turismo, los roques, canaima, salto angel, merida, vacaciones lux, ecoturismo"
          />
          
          <Navbar />
          
          <main className="pb-24 lg:pb-0 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinos" element={<DestinationsPage />} />
              <Route path="/paquetes" element={<PackagesPage />} />
              <Route path="/paquetes/:id" element={<TourDetailsPage />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/cuenta" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
            </Routes>
          </main>
          
          <MobileBottomNav />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
