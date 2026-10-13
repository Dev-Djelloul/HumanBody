# TelomereClock

**TelomereClock** est une application web pédagogique qui illustre le rôle des télomères dans la division et le vieillissement cellulaire. Elle permet d'explorer différents scénarios au moyen de simulations interactives, accompagnées de contenus explicatifs et de références bibliographiques.

**Application en ligne :** [telomereclock.pages.dev](https://telomereclock.pages.dev/)

## Fonctionnalités

- Simuler les divisions d'une cellule de peau ou du foie et observer le raccourcissement de ses télomères.
- Comparer une cellule suivie avec une cellule témoin et lancer une simulation accélérée.
- Explorer l'effet simulé de la télomérase et de facteurs de mode de vie sur la perte télomérique.
- Visualiser la sénescence cellulaire, l'inflammation associée et une intervention simulée par sénolytiques.
- Découvrir pourquoi le modèle traite différemment un neurone adulte, qui ne se divise pas.
- Parcourir des contenus d'histoire et de biologie, répondre à un quiz et consulter une bibliographie.
- Utiliser l'interface en français ou en anglais.

## Collection Human Body

TelomereClock est un module de la collection d'applications scientifiques Human Body. Son portail présente [Heartbeat Lab](https://heartbeat-lab.pages.dev/), ainsi que les prochains modules Neuro Map et Immune Arena.

## Modèle et limites

Les simulations sont des **illustrations pédagogiques**, pas des prédictions individuelles. Le modèle simplifie des mécanismes biologiques complexes et utilise des valeurs indicatives, par exemple une perte de référence de 100 paires de bases par division, une longueur initiale de 10 000 pb et un seuil critique de 4 000 pb. Les résultats affichés ne constituent ni un diagnostic ni un conseil médical.

Le projet fonctionne entièrement dans le navigateur et ne nécessite pas de serveur applicatif. La langue choisie et la progression du journal sont enregistrées localement dans `localStorage` ; elles ne sont pas synchronisées entre appareils.

## Technologies

- React 18
- Vite 5
- JavaScript (ES modules)
- CSS et Tailwind CSS
- Cloudflare Pages pour l'hébergement et les déploiements continus

Le build Vite est configuré avec `vite-plugin-singlefile` pour intégrer les ressources de l'application dans un fichier HTML autonome.

## Développement local

Prérequis : Node.js et npm.

```bash
npm ci
npm run dev
```

Vite affiche l'adresse locale à ouvrir dans le navigateur.

## Tests et build de production

```bash
npm test
npm run build
```

La commande de test vérifie le modèle de simulation et la cohérence des traductions françaises et anglaises. Le build de production est généré dans `dist/`.

## Déploiement

Le projet est hébergé dans le dépôt Human Body et publié dans un projet Cloudflare Pages indépendant, relié à la branche `main`.

Paramètres de build Cloudflare Pages :

| Paramètre | Valeur |
| --- | --- |
| Branche de production | `main` |
| Commande de build | `npm run build` |
| Répertoire de sortie | `dist` |
| Répertoire racine | `modules/telomereclock` |

## Structure du projet

```text
src/
  components/  Composants de l'interface et sections pédagogiques
  content/     Contenu bibliographique
  hooks/       Gestion de la simulation et de la progression
  i18n/        Traductions françaises et anglaises
  model/       Modèle de simulation et tests
scripts/       Vérification des traductions et scripts utilitaires
```
