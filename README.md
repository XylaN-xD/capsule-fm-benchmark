# 🔬 Endoscopic Lesion Localization

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=2800&pause=500&color=2F81F7&center=true&vCenter=true&width=600&lines=Gastrointestinal+Imaging+Research;Capsule+Endoscopy+Analysis;Mucosal+Lesion+Detection;Foundation+Model+Benchmarking" />

<div align="center">
  <img src="dna.svg" alt="DNA Animation" />
</div>

  <img src="https://img.shields.io/badge/Phase-Benchmark%20Evaluation-2F81F7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Research%20Prototype-yellow?style=for-the-badge" />

  <br><br>

<table>
  <tr>
    <td align="center"><b>📊 Workflow</b></td>
    <td align="center"><b>💻 Interface</b></td>
    <td align="center"><b>💾 Data archive</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://itbworkflow.vercel.app"><img src="https://img.shields.io/badge/View-Workflow-2F81F7?style=flat-square&logo=vercel" /></a></td>
    <td align="center"><a href="https://abdtb.vercel.app/"><img src="https://img.shields.io/badge/View-Interface-2F81F7?style=flat-square&logo=vercel" /></a></td>
    <td align="center"><a href="https://drive.google.com/drive/folders/1XQCivGj5UsD78iUjcUe_vsKN8wfFq5zy?usp=drive_link"><img src="https://img.shields.io/badge/Google_Drive-Documentation%20%26%20Dataset-4285F4?style=flat-square&logo=google-drive"/></a></td>
  </tr>
</table>

<details>
<summary><b>🪾 Repository Current Branches</b></summary>

| Branch | Purpose |
|--------|--------|
| main | Documentation & entry |
| data-preparation | Full pipeline |
| frontend | UI & visualization |

</details>

</div>

---

## 📋 Overview

This repository contains a **research-oriented pipeline** for lesion detection and segmentation in capsule endoscopy using the Kvasir-Capsule dataset.

The project benchmarks **foundation models (CLIP, BLIP-2, LLaVA, MedSAM)** under zero-shot conditions to study their ability to generalize to medical imaging.

---

## 🔬 Problem Statement

Capsule endoscopy produces thousands of frames per procedure, making manual inspection inefficient.

This work evaluates:

> Can pretrained foundation models generalize to capsule endoscopy without domain-specific training?

---

## 🧠 Project Scope

### Included
- Endoscopic image analysis  
- Lesion localization and segmentation  
- Zero-shot model evaluation  
- Quantitative metrics (IoU, Dice, F1)  

### Excluded
- Clinical diagnosis  
- Multimodal medical data  
- Automated reporting  

---

## 🧭 Methodology

1. Metadata parsing and bounding box extraction  
2. Frame extraction and annotation  
3. Model evaluation (CLIP, BLIP-2, LLaVA)  
4. MedSAM segmentation using GT prompts  
5. Metric computation and benchmark comparison  

---

## 🔄 Pipeline

```
metadata.json → bounding boxes → frame extraction → MedSAM → masks → evaluation
```

---

## 🖼️ Visual Workflow

👉 https://itbworkflow.vercel.app

---

## 📊 Dataset Summary

| Class | Clips | Frames |
|------|------|--------|
| Ulcer | 29 | 782 |
| Erosion | 46 | 397 |
| Blood-fresh | 9 | 446 |
| Polyp | 1 | 52 |

---

## 🧪 Models

- CLIP  
- BLIP-2  
- LLaVA 1.5  
- MedSAM  

---

## 📊 Results

### Vision Models
- CLIP → 30% accuracy  
- BLIP-2 → 0% (hallucination)  
- LLaVA → partial success  

### MedSAM
- Mean IoU → 0.5101  
- Dice → 0.6152  
- Micro F1 → 0.1795  

---

## 📉 Key Findings

- Strong domain gap in medical imaging  
- MedSAM produces good masks but low recall  
- Blood class completely missed  
- Fine-tuned CNNs outperform zero-shot models  

---

## 🖼️ Sample Outputs

[PLACEHOLDER: ulcer_sample.png]  
[PLACEHOLDER: erosion_sample.png]  
[PLACEHOLDER: blood_sample.png]  
[PLACEHOLDER: polyp_sample.png]  

---

## 🗂 Repository Structure

```text
endoscopic-lesion-localization/
│
├── README.md
├── Docs/
├── data prep/
├── evaluation/
├── medsam/
└── models/
```

---

## 🚀 Execution

```bash
python build_ground_truth.py
python evaluate.py
python complete_metrics.py
```

---

## 🔮 Future Work

- Fine-tuning MedSAM  
- Extend to 14 classes  
- Temporal modeling  
- Full LLaVA evaluation  

---

## 📚 References

- Kvasir-Capsule Dataset  
- MedSAM  
- CLIP / BLIP-2  

---

## 🙌 Acknowledgement

IDEAS — ISI Kolkata
