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
demoUrl: https://mycentralai.com
repoUrl: https://github.com/jilani-BLK/Central
---

**Central** est un espace personnel unifié où **Cobalt**, un assistant IA basé sur **Claude (Anthropic)**, est l'interface principale. L'utilisateur garde le contrôle via des outils, et l'écosystème s'étend à tout ce qui le concerne — santé, finance, projets, lectures, relations — pas seulement la productivité.

> 🛠️ **Phase MVP — en développement actif.**

### Aperçu en images

![Aperçu — chat Cobalt](/projects/central/01-apercu-chat.svg)

*Vue d'ensemble de l'interface, avec Cobalt comme point d'entrée principal.*

![Conversation avec Cobalt](/projects/central/02-conversation.svg)

*Une conversation : Cobalt répond et s'appuie sur sa mémoire de l'utilisateur.*

![Un outil / miniview](/projects/central/03-outil.svg)

*Les outils : chaque domaine de vie (santé, finance, projets…) a sa miniview.*

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
- Déployé sur un domaine de production : **mycentralai.com**.

### Ce que ce projet démontre
La conception **full-stack de bout en bout** d'un produit SaaS réel : architecture front/back, base de données sécurisée, intégration d'une IA avec mémoire, paiements et mise en production.
