import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image }) => {
  const siteTitle = 'Explora el Mundo | Agencia de Viajes Premium';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultDescription = 'Descubre destinos increíbles con nuestra agencia de viajes. Paquetes exclusivos, tours personalizados y las mejores ofertas para tus vacaciones soñadas.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || 'viajes, vacaciones, turismo, destinos, aventura, ofertas de viaje'} />
      <meta name="author" content="Agencia de Viajes" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
