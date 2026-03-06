# 🔬 Endoscopic Lesion Localization

The workflow:- https://itbworkflow.vercel.app

Website Interface (Inital Development):- https://abdtb.vercel.app/

---

This repository contains documentation and exploratory material for an ongoing **research-oriented project** focused on **detecting and localizing mucosal lesions from colonoscopic and capsule endoscopy images**.

The project is motivated by gastrointestinal conditions such as **intestinal (abdominal) tuberculosis**, where accurate identification of mucosal abnormalities plays a critical role in clinical assessment. The work is framed as a **proof-of-concept study**, emphasizing methodological development and experimental analysis rather than clinical deployment.

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Microscope.png" width="25" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Stethoscope.png" width="25" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Dna.png" width="25" />

---

## 🔬 Problem Statement

Given a collection of colonoscopic and capsule endoscopy images, the objective of this research is to design a learning framework capable of **detecting and localizing mucosal lesions suggestive of intestinal tuberculosis (ITB)**.

The current phase focuses exclusively on **visual lesion localization from endoscopic imagery**, serving as a foundational step toward more comprehensive clinical and multimodal analysis.

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" />

---

## 🧠 Project Scope

### Included in the current phase
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Check%20Mark.png" width="16" /> Unimodal analysis using endoscopic images  
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Check%20Mark.png" width="16" /> Detection and localization of mucosal lesions  
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Check%20Mark.png" width="16" /> Visual interpretability of model outputs  

### Out of scope for the current phase
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Cross%20Mark.png" width="16" /> Multimodal integration (CT enterography, histopathology, clinical text)  
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Cross%20Mark.png" width="16" /> Differential diagnosis between gastrointestinal conditions  
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Cross%20Mark.png" width="16" /> Automated clinical reasoning or reporting  
- <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Cross%20Mark.png" width="16" /> Claims of diagnostic or clinical performance  

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" />

---

## 🧭 Methodological Overview

The proposed workflow involves:
1. Preprocessing and normalization of endoscopic images  
2. Feature extraction using visual representation models  
3. Localization of lesion-relevant regions  
4. Generation of visual explanations highlighting areas of interest  

A detailed description of the workflow and methodology is provided in the `docs/` directory.

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" /> <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Dotted%20Line%20Six-Point%20Star.png" width="20" />

---

## 🗂 Repository Structure (Planned)

```text
endoscopic-lesion-localization/
│
├── README.md
├── docs/
│   ├── methodology.md
│   ├── Gantt chart
│   └── workflow.html
│
├── data/
│   └── README.md
│
├── models/
├── experiments/
└── utils/
