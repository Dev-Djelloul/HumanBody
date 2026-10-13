# Heartbeat Lab

Heartbeat Lab is an independent Human Body module for exploring the cardiac cycle, blood flow, cardiac output, and a simplified relationship between flow and mean arterial pressure.

**Collection:** [human-body-hub.pages.dev](https://human-body-hub.pages.dev/)

**Sibling module:** [TelomereClock](https://telomereclock.pages.dev/)

## Learning experience

- Explore four schematic phases of the cardiac cycle and the associated valve states.
- Follow the path of oxygen-poor blood from the body to the lungs and oxygen-rich blood from the lungs to the body.
- Adjust an illustrative heart rate and peripheral-resistance value.
- Compare cardiac output and a simplified mean-pressure estimate.
- Switch between French and English.
- Read the assumptions and open educational physiology references.

All animations are schematic and not to time scale. Model outputs are educational examples, not clinical measurements, predictions, diagnoses, or personal health advice.

## Model assumptions

The model illustrates these relationships:

```text
Cardiac output (L/min) = heart rate (beats/min) × stroke volume (mL) ÷ 1000
Mean arterial pressure (mmHg) ≈ cardiac output (L/min) × selected resistance (mmHg·min/L)
```

Stroke volume is fixed at 70 mL in this model to isolate the heart-rate term. Resistance is a didactic control, not an individual's measured vascular resistance. The model omits the many physiological responses and clinical factors that affect real circulation.

## Run locally

This is a dependency-free static site. Open `index.html` in a browser or serve the directory with a local static HTTP server. To run the pure model tests, use Node.js:

```bash
npm test
```

## Deploy

The module has its own Cloudflare Pages project connected to the Human Body monorepo. Set its Pages root directory to `modules/heartbeat-lab`. No build command is needed; set the output directory to `/` to serve `index.html`, `styles.css`, and the JavaScript modules. Pushes to `main` trigger production deployments.

## References

- OpenStax, [Anatomy and Physiology 2e — The Cardiac Cycle](https://openstax.org/books/anatomy-and-physiology-2e/pages/19-3-cardiac-cycle)
- OpenStax, [Anatomy and Physiology 2e — Cardiac Physiology](https://openstax.org/books/anatomy-and-physiology-2e/pages/19-4-cardiac-physiology)
