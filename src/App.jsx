import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const TourDetailsPage = lazy(() => import('./pages/TourDetailsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

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
            <Suspense fallback={<div className="min-h-screen grid place-items-center text-brand-dark font-black">Cargando...</div>}>
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
            </Suspense>
          </main>
          
          <MobileBottomNav />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
