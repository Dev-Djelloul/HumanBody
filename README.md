# Human Body

Human Body is the public monorepo and gateway for a collection of independent, educational science modules about the human body. Each module keeps its own experience and Cloudflare Pages deployment, while its source code and documentation live together in this repository.

## Modules

| Module | Subject | Status |
| --- | --- | --- |
| [TelomereClock](https://telomereclock.pages.dev/) | Telomeres, cell division, and ageing | Available |
| [Heartbeat Lab](https://heartbeat-lab.pages.dev/) | Heart, circulation, and blood pressure | Available |
| Neuro Map | Neurons, synapses, and memory | Coming soon |
| Immune Arena | Innate defences, antibodies, and vaccines | Coming soon |

The collection portal links to the independently deployable modules. Keeping the source in one repository does not combine their code or simulations.

## Project structure

```text
index.html                      Human Body collection portal
modules/
  telomereclock/                React/Vite educational application
  heartbeat-lab/                Dependency-free cardiac-cycle module
README.md
```

## Run and test modules locally

The collection portal is a static HTML site with no package dependencies. Open `index.html` in a browser or serve the repository root with any local static HTTP server.

TelomereClock:

```bash
cd modules/telomereclock
npm ci
npm test
npm run dev
npm run build
```

Heartbeat Lab:

```bash
cd modules/heartbeat-lab
npm test
```

Heartbeat Lab is static HTML/CSS/JavaScript; serve its directory with any local static HTTP server to preview it.

## Deploy

The portal, TelomereClock, and Heartbeat Lab use separate Cloudflare Pages projects connected to this repository. Each Pages project uses its own root directory and build settings:

| Pages project | Root directory | Build command | Output directory |
| --- | --- | --- | --- |
| `human-body-hub` | `/` | *(none)* | `/` |
| `telomereclock` | `modules/telomereclock` | `npm run build` | `dist` |
| `heartbeat-lab` | `modules/heartbeat-lab` | *(none)* | `/` |

Pushes to `main` can trigger builds for all connected projects. Cloudflare Pages supports this monorepo setup; configure build watch paths later if avoiding unrelated builds becomes useful.

All modules are educational models, not medical diagnostic tools or personal health advice.
