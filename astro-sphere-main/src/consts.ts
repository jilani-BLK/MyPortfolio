import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "J. B. Kermorvan",
  DESCRIPTION: "Découvrez mes projets, mon blog et mes compétences en développement web.",
  AUTHOR: "Jilani Belarbi Kermorvan",
};

// Page Work
export const WORK: Page = {
  TITLE: "Expérience",
  DESCRIPTION: "Découvrez mes expériences professionnelles et les entreprises où j'ai travaillé.",
};

// Page Blog
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Mes articles : projets, apprentissages et réflexions autour du développement et de l'IA.",
};

// Page Projects
export const PROJECTS: Page = {
  TITLE: "Projets",
  DESCRIPTION: "Une collection de mes projets, mettant en avant mes compétences en développement web et UI/UX.",
};

// Page Search
export const SEARCH: Page = {
  TITLE: "Recherche",
  DESCRIPTION: "Trouvez mes articles et projets à l'aide de mots-clés.",
};

// Formulaire de contact (Formspree)
// Crée un formulaire sur https://formspree.io et remplace l'identifiant ci-dessous.
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqeorlod";

export const LINKS: Links = [
  {
    TEXT: "Accueil",
    HREF: "/",
  },
  {
    TEXT: "Expérience",
    HREF: "/work",
  },
  {
    TEXT: "Projets",
    HREF: "/projects",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
];

export const SOCIALS: Socials = [
  { 
    NAME: "GitHub",
    ICON: "github",
    TEXT: "jilani-BLK",
    HREF: "https://github.com/jilani-BLK"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "Jilani Belarbi Kermorvan",
    HREF: "https://www.linkedin.com/in/jilani-kermorvan/"
  },
  { 
    NAME: "Email",
    ICON: "email",
    TEXT: "jilani.belarbi@yahoo.com",
    HREF: "mailto:jilani.belarbi@yahoo.com"
  },
];

