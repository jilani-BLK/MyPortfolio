---
title: "Central"
summary: "Plateforme SaaS d'assistant personnel : une IA (Cobalt, basée sur Claude) qui se souvient de tout, avec mémoire vectorielle, outils et abonnements Stripe."
date: "Apr 18 2026"
draft: false
tags:
- SaaS
- React
- TypeScript
- IA
- Supabase
---

**Central** est un espace personnel unifié où **Cobalt**, un assistant IA basé sur **Claude (Anthropic)**, est l'interface principale. L'utilisateur garde le contrôle via des outils, et l'écosystème s'étend à tout ce qui le concerne — santé, finance, projets, lectures, relations — pas seulement la productivité.

> **Phase MVP — en développement actif.** Code source privé pour l'instant.

### Aperçu en images

<img src="/projects/central/01-apercu-chat-light.png?v=3" alt="Aperçu — chat Cobalt" class="theme-img-light" />
<img src="/projects/central/01-apercu-chat-dark.png?v=3" alt="Aperçu — chat Cobalt" class="theme-img-dark" />

*Vue d'ensemble de l'interface, avec Cobalt comme point d'entrée principal.*

<video autoplay loop muted playsinline preload="metadata" aria-label="Conversation avec Cobalt">
  <source src="/projects/central/02-conversation.webm?v=3" type="video/webm" />
  <source src="/projects/central/02-conversation.mp4?v=3" type="video/mp4" />
</video>

*Une conversation : Cobalt répond et s'appuie sur sa mémoire de l'utilisateur.*

<img src="/projects/central/03-outil-light.png" alt="Tableau de bord adaptatif de Central" class="theme-img-light" />
<img src="/projects/central/03-outil-dark.png" alt="Tableau de bord adaptatif de Central" class="theme-img-dark" />

*Le tableau de bord s'adapte : il met en avant les miniviews réellement utilisées, pour aller à l'essentiel sans surcharge.*

![Les 4 abonnements](/projects/central/04-abonnements.svg)

*Les 4 tiers d'abonnement, gérés via Stripe (Checkout, Portal, Webhooks).*

### Stack technique
- **Front-End** : React 18, Vite, TypeScript, Tailwind CSS v4.
- **Back-End** : Express, Node.js, TypeScript.
- **Auth & données** : Supabase (JWT, PostgreSQL, RLS, Realtime).
- **IA** : Anthropic SDK (Claude Sonnet 4.6 / Haiku 4.5), avec une couche **Ollama local** pour le briefing et la consolidation mémoire.

### Fonctionnalités clés
- **Mémoire à coût zéro** : embeddings calculés côté client (Transformers.js en Web Worker) et stockés dans **Supabase pgvector** (index HNSW) — Cobalt se souvient durablement de ce qui concerne l'utilisateur.
- **Abonnements** : facturation **Stripe** complète (Checkout, Portal, Webhooks) sur 4 tiers, avec essai gratuit.
- **Intégrations** : Google Maps + Places API, emails transactionnels (Resend), interface bilingue **fr / en**.
- Nom de domaine réservé pour la mise en production : **mycentralai.com**.

### Les 4 offres
- **Free — 0 €** : Haiku 4.5, **10 messages/jour** (après **3 jours d'essai en Sonnet illimité**). Pas de recherche web, et Cobalt peut naviguer mais sans CRUD — en revanche, **utilisation illimitée des outils** déjà présents (tâches, calendrier, notes…) et **mémoire complète**.
- **Standard — 9,99 €/mois** : Haiku 4.5, **30 messages/jour**, chat IA complet et **tous les outils en CRUD**.
- **Pro — 19,99 €/mois** : passe à **Sonnet 4.6**, **100 messages/jour** et **10 recherches web/jour**.
- **Max — 29,99 €/mois** : Sonnet 4.6, **500 messages/jour** et **30 recherches web/jour** — l'offre la plus complète.

### Le vrai défi : l'expérience
La difficulté de Central n'est pas tant technique qu'**UX**. Tout doit rester simple, rapide et sans frustration, tout en minimisant le superflu. Le tableau de bord est **contextuel** : il n'affiche pas tout, il fait remonter ce que l'utilisateur utilise vraiment. Concevoir cette simplicité-là prend du temps — et c'est assumé : c'est ce qui sépare un outil qu'on subit d'un outil qu'on adopte.

### Ce que ça démontre
La capacité à concevoir et livrer **seul un produit SaaS complet**, de l'idée à la mise en production : architecture front/back, base de données sécurisée, IA dotée d'une mémoire, paiements Stripe. La preuve que je peux porter une fonctionnalité de bout en bout, sans intermédiaire.
