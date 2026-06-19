---
title: "Mes premiers pas en robotique avec un bras 6 axes"
summary: "Je me lance dans la robotique : pourquoi, avec quel matériel (le bras SO-ARM101), et ce que je compte en faire avec PMark-1."
date: "Jun 19 2026"
draft: false
tags:
- Robotique
- PMark-1
- Apprentissage
---

J'aime quand le logiciel rencontre le **matériel**. Après avoir passé du temps sur le pur software (web, IA), j'avais envie de toucher quelque chose de **physique**, qui bouge pour de vrai. Alors je me lance dans la **robotique** — en débutant, et c'est très bien comme ça.

## Le point de départ : un vrai bras robotique

Plutôt que de tout réinventer, j'ai investi dans un kit solide pour apprendre les bases sur du concret : le **Waveshare SO-ARM101**, un **bras robotique 6 axes open-source**. Quelques raisons de ce choix :

- **Open-source** : je peux comprendre, modifier, et ne pas rester prisonnier d'une boîte noire.
- **Servomoteurs bus à fort couple** + pièces imprimées en **3D (résine)** : on est sur du sérieux, pas un jouet.
- Et surtout : un **support natif de [Hugging Face LeRobot](https://github.com/huggingface/lerobot)** — le pont parfait entre la robotique et l'**apprentissage par IA**, ce qui colle exactement à ce qui me passionne.

## Ce que je veux apprendre

Mon objectif avec **PMark-1** (mon projet de bras articulé) n'est pas de « faire bouger un bras », mais de comprendre toute la chaîne, brique par brique :

- la **cinématique** : comment penser le mouvement de 6 axes ;
- la **motorisation** et les **capteurs** : faire dialoguer le logiciel et le moteur ;
- le **contrôle** en **Python** et **C** ;
- et, à terme, un **pilotage par IA** — c'est là que LeRobot entre en jeu.

## Pourquoi partir d'un kit plutôt que de zéro ?

Parce que la meilleure façon d'apprendre, c'est de **mettre les mains dedans tout de suite**, sur une base qui fonctionne, puis de la pousser. Je préfère comprendre un système réel et le faire évoluer, plutôt que de rester bloqué des mois sur la mécanique avant d'avoir bougé le moindre moteur. C'est la même philosophie que pour mes projets logiciels : **avancer brique par brique, sur du concret.**

## La suite

Je documenterai ici mes étapes : montage, premiers mouvements, galères et apprentissages. L'idée à long terme, c'est de relier ça à ce que je sais faire en logiciel et en IA — pour qu'un jour, ce bras ne se contente pas d'exécuter, mais **raisonne** un peu sur ce qu'il fait.

À suivre.
