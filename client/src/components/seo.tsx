import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage = '/logo.png',
  ogType = 'website',
  canonical,
  noindex = false,
  structuredData,
}: SEOProps) {
  const [location] = useLocation();
  const baseUrl = 'https://taktil.az'; // ❗ ÖZ DOMAIN-NİZİ YAZMALISINIZ
  const fullUrl = `${baseUrl}${location}`;
  const canonicalUrl = canonical || fullUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  useEffect(() => {
    // Title
    document.title = `${title} | Taktil.az`;

    // Meta tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    if (noindex) updateMetaTag('robots', 'noindex, nofollow');

    // Open Graph
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', fullOgImage, 'property');
    updateMetaTag('og:url', fullUrl, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:site_name', 'Taktil.az', 'property');
    updateMetaTag('og:locale', 'az_AZ', 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullOgImage);

    // Canonical
    updateCanonicalLink(canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    return () => {
      // Cleanup on unmount
      removeMetaTag('description');
      removeMetaTag('keywords');
      removeMetaTag('og:title', 'property');
      removeMetaTag('og:description', 'property');
      removeMetaTag('og:image', 'property');
      removeMetaTag('og:url', 'property');
      removeMetaTag('twitter:card');
      removeCanonicalLink();
      removeStructuredData();
    };
  }, [title, description, keywords, fullOgImage, fullUrl, canonicalUrl, ogType, noindex, structuredData]);

  return null;
}

// Helper functions
function updateMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function removeMetaTag(name: string, attr: 'name' | 'property' = 'name') {
  const meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (meta) meta.remove();
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

function removeCanonicalLink() {
  const link = document.querySelector('link[rel="canonical"]');
  if (link) link.remove();
}

function updateStructuredData(data: object) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function removeStructuredData() {
  const script = document.getElementById('structured-data');
  if (script) script.remove();
}