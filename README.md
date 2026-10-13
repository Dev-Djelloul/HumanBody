# Human Body

Human Body is a public monorepo and bilingual collection portal for independent, interactive science modules about the human body. Each module has its own subject, interface, and educational model; the shared repository keeps their source code and documentation together.

**Collection portal:** [human-body-hub.pages.dev](https://human-body-hub.pages.dev/)

**Source repository:** [github.com/Dev-Djelloul/HumanBody](https://github.com/Dev-Djelloul/HumanBody)

## The collection

| # | Module | Explore | Subject |
| --- | --- | --- | --- |
| 01 | TelomereClock | [Open module](https://telomereclock.pages.dev/) | Telomeres, cell division, telomerase, and cellular ageing |
| 02 | Heartbeat Lab | [Open module](https://heartbeat-lab.pages.dev/) | The cardiac cycle, blood flow, cardiac output, and blood pressure |
| 03 | Neuro Map | [Open module](https://human-body-hub.pages.dev/modules/neuro-map/) | Neurons, electrical and chemical signalling, synapses, and plasticity |
| 04 | Immune Arena | [Open module](https://human-body-hub.pages.dev/modules/immune-arena/) | Barrier defences, innate and adaptive immunity, antibodies, and immune memory |

All four modules are available in French and English. TelomereClock and Heartbeat Lab have their own Cloudflare Pages addresses; Neuro Map and Immune Arena are currently served from paths under the collection portal.

## Modules at a glance

### TelomereClock

A React application for exploring telomere shortening through cell divisions, telomerase scenarios, lifestyle factors, cellular senescence, and related educational material. Its simulations are explanatory models, not predictions about an individual.

### Heartbeat Lab

A static, interactive introduction to the four phases of the cardiac cycle, blood flow through the heart, and simplified relationships between heart rate, cardiac output, vascular resistance, and mean pressure.

### Neuro Map

A static, bilingual experience tracing a signal through a neuron and across a synapse. Interactive anatomy highlights and a qualitative plasticity analogy introduce how connections can change with experience.

### Immune Arena

A static, bilingual walkthrough of barrier defences and the innate and adaptive immune responses. It includes a step-by-step schematic response and a qualitative comparison of immune responses with and without relevant immune memory.

## Repository layout

```text
.
├── index.html                    Human Body collection portal
├── modules/
│   ├── telomereclock/            React/Vite module
│   ├── heartbeat-lab/            Static cardiac-cycle module
│   ├── neuro-map/                Static neuron and synapse module
│   └── immune-arena/             Static immune-system module
└── README.md
```

Each module is self-contained. Static modules use HTML, CSS, and JavaScript ES modules; they do not require a package installation or build step. TelomereClock uses React and Vite.

## Run locally

### Prerequisites

- Node.js 18 or later and npm for tests; TelomereClock also uses Node.js and npm for development and production builds.
- A local static HTTP server to preview the portal and static modules. Python 3 is one option.

From the repository root, serve the collection and the three static modules hosted beneath it:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). The static module routes are:

- `/modules/heartbeat-lab/`
- `/modules/neuro-map/`
- `/modules/immune-arena/`

To run the model tests for the static modules from the repository root:

```bash
npm --prefix modules/heartbeat-lab test
npm --prefix modules/neuro-map test
npm --prefix modules/immune-arena test
```

TelomereClock has its own Vite development server. Install dependencies and start it from the repository root:

```bash
npm --prefix modules/telomereclock install
npm --prefix modules/telomereclock run dev
```

Vite prints the local development URL. Run the TelomereClock tests and production build from the repository root with:

```bash
npm --prefix modules/telomereclock test
npm --prefix modules/telomereclock run build
```

The generated production site is written to `modules/telomereclock/dist/`.

## Production deployments

The collection portal, TelomereClock, and Heartbeat Lab are published through separate Cloudflare Pages projects connected to this monorepo. The two newer modules are served as static files from the collection site's root deployment.

| Site | Production URL | Pages root directory | Build command | Output directory |
| --- | --- | --- | --- | --- |
| Human Body portal, Neuro Map, and Immune Arena | [human-body-hub.pages.dev](https://human-body-hub.pages.dev/) | `/` | None | `/` |
| TelomereClock | [telomereclock.pages.dev](https://telomereclock.pages.dev/) | `modules/telomereclock` | `npm run build` | `dist` |
| Heartbeat Lab | [heartbeat-lab.pages.dev](https://heartbeat-lab.pages.dev/) | `modules/heartbeat-lab` | None | `/` |

Production deployments are configured from the `main` branch. A push can trigger builds for the connected Pages projects. Neuro Map and Immune Arena do not currently have separate Pages projects or separate production domains. If either is later deployed independently, use its module directory as the Pages root, no build command, and `/` as the output directory.

## Educational scope

These modules are designed for learning and exploration. Their diagrams and simulations simplify biological processes; they are not clinical measurements, personal predictions, diagnoses, treatment recommendations, or medical advice. Consult qualified health professionals for personal medical questions.
