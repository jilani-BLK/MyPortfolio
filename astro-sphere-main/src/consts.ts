import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Jilani BLK",
  DESCRIPTION: "Découvrez mes projets, mon blog, et mes compétences en développement web.",
  AUTHOR: "Jilani Belarbi Kermorvan",
};

// Page Work
export const WORK: Page = {
  TITLE: "Expérience",
  DESCRIPTION: "Découvrez mes expériences professionnelles et les entreprises où j'ai travaillé.",
};

// Page blog
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Envoyez-moi un message ou connectez-vous avec moi sur les réseaux sociaux.",
};

// Page Projects
export const PROJECTS: Page = {
  TITLE: "Projets",
  DESCRIPTION: "Une collection de mes projets, mettant en avant mes compétences en développement web et UI/UX.",
};

// Page Search
export const SEARCH: Page = {
  TITLE: "Recherche",
  DESCRIPTION: "Trouvez des articles de blog et des projets à l'aide de mots-clés.",
};

// Page Contact
export const CONTACT: Page = {
  TITLE: "Contact",
  DESCRIPTION: "Envoyez-moi un message ou connectez-vous avec moi via le formulaire de contact.",
};


export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Work", 
    HREF: "/work", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Contact", 
    HREF: "/contact", 
  },
];

export const SOCIALS: Socials = [
  { 
    NAME: "GitHub",
    ICON: "github",
    TEXT: "JilB444",
    HREF: "https://github.com/JilB444"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "Jilani Belarbi",
    HREF: "https://www.linkedin.com/in/jilani-kermorvan/"
  },
  { 
    NAME: "Email",
    ICON: "email",
    TEXT: "jilani.belarbi@yahoo.com",
    HREF: "mailto:jilani.belarbi@yahoo.com"
  },
];

