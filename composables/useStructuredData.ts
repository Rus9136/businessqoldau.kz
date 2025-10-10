export const useStructuredData = () => {
  const getOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Business Qoldau",
      "alternateName": "Инновационный грант Business Qoldau",
      "url": "https://businessqoldau.kz",
      "logo": "https://businessqoldau.kz/logo.png",
      "description": "Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Алматы",
        "addressCountry": "KZ"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-XXX-XXX-XX-XX",
        "contactType": "customer service",
        "email": "info@businesscamp.kz"
      },
      "sameAs": [
        "https://businessqoldau.kz"
      ]
    }
  }

  const getEventSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Business Qoldau 2025",
      "description": "Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге",
      "url": "https://businessqoldau.kz",
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://businessqoldau.kz"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Business Qoldau",
        "url": "https://businessqoldau.kz"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KZT",
        "availability": "https://schema.org/InStock",
        "url": "https://businessqoldau.kz/how-to-apply"
      }
    }
  }

  const getWebSiteSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Business Qoldau",
      "alternateName": "Инновационный грант Business Qoldau",
      "url": "https://businessqoldau.kz",
      "description": "Грант для предпринимателей Казахстана с призовым фондом 10 млн тенге",
      "inLanguage": ["ru", "kk"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://businessqoldau.kz/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  }

  return {
    getOrganizationSchema,
    getEventSchema,
    getWebSiteSchema
  }
}
