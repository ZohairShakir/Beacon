import { faqItems, siteConfig } from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/beacon-logo.svg`,
    description: siteConfig.description,
    sameAs: ["https://github.com/ZohairShakir/beacon"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?url={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Beacon is an API auditing platform for REST API testing, API health checks, API performance analysis, security scanning, and best-practice scoring.",
    url: siteConfig.url,
    featureList: [
      "REST API Testing",
      "API Health Check",
      "API Performance Checker",
      "API Security Scanner",
      "API Score and Grading",
      "Endpoint Response Analysis",
    ],
  };
}

export function webPageJsonLd(path = "") {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${siteConfig.name} — API Health Check & REST API Testing`,
    url: `${siteConfig.url}${path}`,
    description: siteConfig.description,
    isPartOf: { "@type": "WebSite", url: siteConfig.url },
    about: {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
    },
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function homeJsonLd() {
  return [
    organizationJsonLd(),
    websiteJsonLd(),
    softwareApplicationJsonLd(),
    webPageJsonLd("/"),
    faqPageJsonLd(),
  ];
}
