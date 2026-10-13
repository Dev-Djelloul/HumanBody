# Human Body

Human Body est un monorepo public et un portail bilingue qui rassemble des modules scientifiques interactifs consacrés au corps humain. Chaque module possède son propre sujet, son interface et son modèle pédagogique ; leurs codes sources et leur documentation sont regroupés dans ce dépôt.

**Portail de la collection :** [human-body-hub.pages.dev](https://human-body-hub.pages.dev/)

**Dépôt source :** [github.com/Dev-Djelloul/HumanBody](https://github.com/Dev-Djelloul/HumanBody)

## La collection

| Nº | Module | Découvrir | Sujet |
| --- | --- | --- | --- |
| 01 | TelomereClock | [Ouvrir le module](https://telomereclock.pages.dev/) | Télomères, divisions cellulaires, télomérase et vieillissement cellulaire |
| 02 | Heartbeat Lab | [Ouvrir le module](https://heartbeat-lab.pages.dev/) | Cycle cardiaque, circulation sanguine, débit cardiaque et pression artérielle |
| 03 | Neuro Map | [Ouvrir le module](https://human-body-hub.pages.dev/modules/neuro-map/) | Neurones, signaux électriques et chimiques, synapses et plasticité |
| 04 | Immune Arena | [Ouvrir le module](https://human-body-hub.pages.dev/modules/immune-arena/) | Barrières de défense, immunités innée et adaptative, anticorps et mémoire immunitaire |

Les quatre modules sont disponibles en français et en anglais. TelomereClock et Heartbeat Lab possèdent chacun leur propre adresse Cloudflare Pages ; Neuro Map et Immune Arena sont actuellement accessibles depuis des chemins du portail de la collection.

## Présentation des modules

### TelomereClock

Une application React qui permet d’explorer le raccourcissement des télomères au fil des divisions cellulaires, la télomérase, les facteurs liés au mode de vie, la sénescence cellulaire et des contenus pédagogiques associés. Ses simulations sont des modèles explicatifs et ne constituent pas des prédictions individuelles.

### Heartbeat Lab

Une expérience statique et interactive pour découvrir les quatre phases du cycle cardiaque, la circulation du sang dans le cœur et les liens simplifiés entre fréquence cardiaque, débit cardiaque, résistance vasculaire et pression moyenne.

### Neuro Map

Une expérience bilingue et statique qui suit un signal dans un neurone et à travers une synapse. Des repères anatomiques interactifs et une analogie qualitative de la plasticité présentent la manière dont les connexions peuvent évoluer avec l’expérience.

### Immune Arena

Une exploration bilingue et statique des barrières de défense et des réponses immunitaires innée et adaptative. Le module comprend un parcours schématique des étapes de la réponse ainsi qu’une comparaison qualitative de la mémoire immunitaire.

## Organisation du dépôt

```text
.
├── index.html                    Portail de la collection Human Body
├── assets/
│   ├── brand/                    Logo, symbole et favicon Human Body (SVG)
│   └── illustrations/             Illustration de la page d’accueil (SVG)
├── modules/
│   ├── telomereclock/            Module React/Vite
│   ├── heartbeat-lab/            Module statique sur le cycle cardiaque
│   ├── neuro-map/                Module statique sur les neurones et les synapses
│   └── immune-arena/             Module statique sur le système immunitaire
└── README.md
```

Chaque module est autonome. Les modules statiques utilisent HTML, CSS et les modules JavaScript ES ; ils ne nécessitent ni installation de dépendances ni étape de compilation. TelomereClock utilise React et Vite.

## Identité visuelle

Le portail utilise des illustrations vectorielles SVG, nettes à toutes les tailles d’écran :

- `assets/brand/human-body-logo.svg` : logo horizontal Human Body et wordmark, également utilisé dans les en-têtes des modules.
- `assets/brand/human-body-mark.svg` : symbole carré utilisé comme favicon.
- `assets/illustrations/human-body-exploration.svg` : illustration scientifique de la page d’accueil, près du titre principal.

## Lancer les projets en local

### Prérequis

- Node.js 18 ou une version ultérieure et npm pour exécuter les tests ; TelomereClock utilise également Node.js et npm pour le développement et la compilation de production.
- Un serveur HTTP statique local pour prévisualiser le portail et les modules statiques. Python 3 peut, par exemple, être utilisé à cette fin.

Depuis la racine du dépôt, lancez un serveur pour le portail et les trois modules statiques qu’il héberge :

```bash
python3 -m http.server 8000
```

Ouvrez ensuite [http://localhost:8000](http://localhost:8000). Les chemins des modules statiques sont :

- `/modules/heartbeat-lab/`
- `/modules/neuro-map/`
- `/modules/immune-arena/`

Pour exécuter les tests des modèles des modules statiques depuis la racine du dépôt :

```bash
npm --prefix modules/heartbeat-lab test
npm --prefix modules/neuro-map test
npm --prefix modules/immune-arena test
```

TelomereClock dispose de son propre serveur de développement Vite. Installez ses dépendances et lancez le serveur depuis la racine du dépôt :

```bash
npm --prefix modules/telomereclock install
npm --prefix modules/telomereclock run dev
```

Vite affiche l’adresse locale à ouvrir dans le navigateur. Pour exécuter les tests de TelomereClock et sa compilation de production depuis la racine du dépôt :

```bash
npm --prefix modules/telomereclock test
npm --prefix modules/telomereclock run build
```

Le site compilé est généré dans `modules/telomereclock/dist/`.

## Déploiements en production

Le portail de la collection, TelomereClock et Heartbeat Lab sont publiés par l’intermédiaire de projets Cloudflare Pages distincts, reliés à ce monorepo. Neuro Map et Immune Arena sont servis comme fichiers statiques par le déploiement du portail.

| Site | Adresse de production | Répertoire racine Pages | Commande de compilation | Répertoire de sortie |
| --- | --- | --- | --- | --- |
| Portail Human Body, Neuro Map et Immune Arena | [human-body-hub.pages.dev](https://human-body-hub.pages.dev/) | `/` | Aucune | `/` |
| TelomereClock | [telomereclock.pages.dev](https://telomereclock.pages.dev/) | `modules/telomereclock` | `npm run build` | `dist` |
| Heartbeat Lab | [heartbeat-lab.pages.dev](https://heartbeat-lab.pages.dev/) | `modules/heartbeat-lab` | Aucune | `/` |

Les déploiements de production sont configurés à partir de la branche `main`. Une publication sur cette branche peut déclencher la compilation des projets Pages reliés au dépôt. Neuro Map et Immune Arena ne disposent actuellement ni de projets Pages ni de domaines de production distincts. Pour les déployer séparément à l’avenir, indiquez le répertoire du module correspondant comme répertoire racine Pages, ne configurez aucune commande de compilation et utilisez `/` comme répertoire de sortie.

## Portée pédagogique

Ces modules sont conçus pour l’apprentissage et la découverte. Leurs schémas et leurs simulations simplifient des processus biologiques ; ils ne constituent ni des mesures cliniques, ni des prédictions individuelles, ni des diagnostics, ni des recommandations de traitement ou des conseils médicaux. Pour toute question médicale personnelle, adressez-vous à un professionnel de santé qualifié.
