---
title: "Darwin"
summary: "Mon IA personnelle : un assistant numérique 100% local et souverain (LLM open-source, voix, mémoire continue) que je conçois de A à Z. En cours de développement."
date: "May 23 2026"
draft: false
tags:
- IA
- Python
- LLM local
- C
---

**Darwin, c'est mon IA personnelle** — un assistant numérique que je conçois et construis moi-même, pensé comme une **présence permanente** sur ma machine. Ni chatbot, ni application web : un **programme qui vit en local**, qui me connaît, se souvient de tout et agit pour moi. (Nom de code du projet : **Hedwige**.)

> **Projet en cours de développement** — code source privé pour l'instant.

### Aperçu en images

![Le TUI en conversation](/projects/darwin/01-tui.svg)

*Conversation au clavier avec Darwin dans son interface terminal.*

![Réveil vocal](/projects/darwin/02-reveil.svg)

*Réveil mains-libres : le mot « Darwin » déclenche l'écoute, puis la réponse vocale.*

![Action / primitive](/projects/darwin/03-primitive.svg)

*Darwin compose ses primitives universelles pour agir sur la machine.*

### Principe : souveraineté totale
Tout fonctionne **en local**, sans aucun service cloud ni API tierce. Si Internet disparaît, Darwin continue de fonctionner. Mes données restent **entièrement chez moi** — chiffrement au repos et en transit.

### Cerveau : LLM open-source local
- Modèles **Qwen2.5 (14B / 7B)** exécutés localement, sélectionnés automatiquement **selon la RAM disponible**.
- **Cerveau distant** optionnel : le raisonnement peut être délégué à une machine plus puissante du réseau (via VPN maillé Tailscale/WireGuard), le portable restant le « corps » (voix, vision, présence).

### Voix & présence
- Réveil mains-libres par **wake word** (« Darwin »), conversation vocale en français.
- Synthèse vocale par **voix clonée** (Qwen3-TTS), avec repli sur une voix locale Piper.

### Mémoire & raisonnement
- **Une seule conscience continue**, avec une mémoire structurée embarquée — pas de conversations isolées.
- Pas d'actions scriptées : Darwin compose un petit ensemble de **primitives universelles** (chercher, ouvrir, regarder l'écran, cliquer, taper, lire) **par le raisonnement**, ce qui lui permet d'accomplir des tâches jamais anticipées.

### Choix techniques
- **Code pur, sans framework agent** (ni LangChain, ni LlamaIndex…) : **Python** pour l'orchestration, **C/C++** pour la performance.
- Conçu comme un **démon système** permanent, maîtrisé de bout en bout.

### Ce que ça démontre
Une maîtrise concrète de l'**IA exécutée en local** — LLM open-source, voix, mémoire continue, raisonnement par primitives — et la capacité à architecturer un système complexe **sans framework**, en Python et C. Précieux pour qui veut intégrer l'IA **sans dépendre du cloud ni exposer ses données**.
