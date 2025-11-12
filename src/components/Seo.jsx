import React from 'react';
    import { Helmet } from 'react-helmet-async';

    const Seo = ({
      title = 'CrossLearning',
      description = 'Ecosistema de Aprendizaje Inteligente y Agilidad en el Desarrollo del Talento Humano.',
      path = '/',
      image,
      noIndex = false,
    }) => {
      const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
      const canonicalUrl = `${siteUrl}${path}`;
      const fullTitle = title ? `${title} | CrossLearning` : 'CrossLearning';
      const ogImage = image ? `${siteUrl}${image}` : `${siteUrl}/social/home.jpg`;

      return (
        <Helmet>
          <title>{fullTitle}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
          {noIndex && <meta name="robots" content="noindex, nofollow" />}

          <meta property="og:title" content={fullTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="CrossLearning" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={fullTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImage} />
        </Helmet>
      );
    };

    export default Seo;