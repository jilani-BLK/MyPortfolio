---
title: "Construire Darwin : une IA personnelle 100 % locale"
summary: "Pourquoi et comment je construis Darwin — un assistant souverain qui tourne entièrement sur ma machine, sans cloud. Principes, architecture, et quelques galères bien réelles."
date: "Jun 17 2026"
draft: false
tags:
- Darwin
- IA
- Projet
---

Depuis plusieurs mois, je construis **Darwin** : un assistant numérique personnel qui ne ressemble ni à un chatbot, ni à une application. C'est un **programme qui vit en permanence sur ma machine**, me connaît, se souvient de tout et agit pour moi. Le nom de code du projet est **Hedwige** ; l'entité, c'est Darwin.

Cet article raconte les **choix de conception** derrière le projet, et quelques galères qui m'ont beaucoup appris.

## Le pari de départ : tout en local

La règle numéro un est **non négociable : souveraineté totale.** Tout fonctionne en local, sans aucun service cloud ni API tierce. Si Internet disparaît, Darwin continue de fonctionner. Mes données restent chez moi, chiffrées.

Ce choix change tout :

- **Pas de coût, pas de quota** : le modèle tourne sur ma machine, je peux l'utiliser sans limite.
- **Confidentialité réelle** : rien ne part vers un serveur extérieur.
- **Indépendance** : je ne dépends d'aucun fournisseur qui pourrait fermer, augmenter ses prix ou changer ses conditions.

Deuxième principe : **du code maîtrisé, sans framework d'agent.** Python pour l'orchestration et la logique, C/C++ pour les parties critiques (l'inférence, la transcription, la base de données). Pas de LangChain ni d'usine à gaz : je veux comprendre chaque brique.

## Le cerveau : un LLM open-source sur 18 Go de RAM

Mon matériel de départ est un MacBook Pro M3 Pro avec **18 Go de RAM** — et un budget nul. Tout repose donc sur de l'open-source et sur des choix malins.

Le moteur d'inférence est **llama.cpp** (format GGUF), avec des modèles **Qwen 2.5**. Le point clé : le choix du modèle est **adaptatif selon la RAM disponible** — un 14B quand la machine est libre, un 7B en repli quand d'autres composants (comme la voix) occupent le GPU.

Mais 18 Go, c'est un plafond. Un modèle de 70B n'y tiendra jamais. D'où une idée que j'ai déjà mise en place : le **cerveau distant**. Darwin peut **déléguer son raisonnement à une machine plus puissante de mon réseau** — le portable reste le « corps » (voix, vision, présence) pendant qu'un cerveau plus gros réfléchit ailleurs. Le tout reste souverain : ça passe par un **VPN privé maillé** (WireGuard / Tailscale), jamais par un port ouvert sur Internet. Et un **cerveau double** envoie les tâches triviales au petit modèle local rapide, et le vrai raisonnement au gros modèle distant. C'est ma route vers un Darwin bien plus capable.

## La mémoire : le cœur du projet

Un assistant qui oublie tout à chaque conversation ne sert à rien. La mémoire de Darwin est donc **multi-couches** :

- **De travail** : le contexte immédiat.
- **Épisodique** : les événements et échanges, retrouvés par recherche sémantique vectorielle.
- **Sémantique** : les faits durables, modélisés en graphe (entités, relations).
- **Procédurale** : les savoir-faire appris.
- **Engagements** : ce qu'il doit surveiller ou déclencher plus tard.

Le tout dans un seul fichier **SQLite** chiffré, avec l'extension `sqlite-vec` pour les vecteurs. Et un principe de sécurité codé en dur : **un secret (mot de passe, token, numéro de carte) n'est jamais stocké en mémoire durable.**

## Agir sans actions scriptées

C'est sans doute ma décision de conception préférée. Darwin **ne possède pas une fonction par tâche** — pas de `ouvrir_spotify()`, pas de recette pré-écrite. Il dispose d'un petit ensemble de **primitives universelles** : chercher, ouvrir, regarder l'écran, lire, exécuter une commande. Et il les **compose par le raisonnement**.

Concrètement, il **voit par l'image** (un modèle de vision local) et **contrôle la machine** comme le ferait un second utilisateur. Conséquence : il peut accomplir des tâches que je n'avais jamais anticipées, parce qu'il *raisonne* au lieu d'exécuter un script figé. C'est ce qui le distingue d'un assistant à catalogue fini.

## La confiance : ne jamais être une boîte noire

Une IA autonome avec accès au système, ça peut faire peur — à juste titre. Ma réponse, c'est la **transparence en temps réel** : Darwin expose en continu ce qu'il perçoit, ce qu'il s'apprête à faire (**avant** de le faire, pour me laisser intervenir), ses actions, son raisonnement et ce qu'il écrit en mémoire. Couplé à un *kill switch*, ce flux me permet de comprendre et d'arrêter Darwin à tout moment.

Et il y a un **garde-fou de dernier recours**, non contournable, contre l'irréversible : effacer le disque, `rm -rf /`, `mkfs`… sont refusés, point.

## Deux galères qui m'ont appris beaucoup

La théorie, c'est joli. La réalité mord.

**L'incident « oui » fatal.** Un jour, un simple « oui » que je destinais à une *question* de Darwin a déclenché une action destructrice (un `kill`) proposée par son module de garde — parce que la détection d'accord se contentait de chercher le mot « oui » dans ma phrase. Leçon retenue : un acte destructeur exige désormais un **« oui » franc et seul**, et seulement si Darwin n'a pas posé de question juste avant. Son module de garde est même repassé en mode **observation** par défaut tant que son jugement n'est pas parfaitement fiable.

**Le crash GPU Metal.** En lançant la voix haute qualité *en même temps* que le modèle 14B, j'ai saturé le GPU et tout est tombé. Recalibrage : quand la voix tourne, le cerveau passe automatiquement en 7B. Un bon rappel que sur 18 Go, chaque gigaoctet se négocie.

## Ma méthode : brique par brique

Le plus grand risque d'un projet comme celui-ci, c'est l'**inaboutissement**. Pour l'éviter, je construis **par briques testables** : chaque brique validée donne lieu à un commit, et je tiens un **journal de bord** où je note ce qui est fait, ce qui a été testé, et la prochaine étape. Un livrable visible à chaque étape — c'est ce qui fait avancer un projet ambitieux sans se perdre.

## Où en est Darwin ?

Le « corps » de Darwin existe déjà : inférence locale, voix, mémoire, vision, cerveau distant, garde-fous de sécurité. La suite, c'est de muscler son intelligence (le fameux gros cerveau distant) et d'affiner sa proactivité — qu'il intervienne au bon moment, et qu'il se taise le reste du temps.

C'est un projet de longue haleine, et c'est exactement ce qui me plaît : il mêle tout ce qui me passionne — l'IA, le système, l'architecture logicielle, et un peu de philosophie sur ce qu'on attend vraiment d'une machine qui nous assiste.

À suivre dans un prochain article. 🤖
