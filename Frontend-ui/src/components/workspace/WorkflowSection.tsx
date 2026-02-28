import { ExternalLink, GitBranch, ArrowRight, GanttChart, Cpu, FlaskConical, Target, Lightbulb, Layers, BarChart3 } from "lucide-react";

const pipelineBlocks = [
  {
    id: "01",
    icon: Layers,
    title: "Multimodal Data Sources",
    phase: "Data Collection",
    status: "active" as const,
    desc: "Starting unimodal · Endoscopy-first · Real data only — no synthetic",
    details: [
      "Colonoscopy / Capsule — Kvasir-Capsule 4.7M frames · 47k BBoxes",
      "CT Enterography — Cross-sectional imaging, wall thickening, stricture",
      "Histopathology — Whole-slide images, caseating granulomas",
      "Clinical Text — TB contact history, symptom chronology",
    ],
  },
  {
    id: "02",
    icon: FlaskConical,
    title: "Modality-Specific Preprocessing",
    phase: "Preprocessing",
    status: "active" as const,
    desc: "Normalization · Augmentation · Standardization",
    details: [
      "Endoscopy — CLAHE + specularity masking + elastic deformation",
      "CT — HU windowing W:400 L:50 · 3–5mm slice standardization",
      "Histology — 256×256 tiling at 20× magnification",
      "Clinical Text — SNOMED-CT term mapping + negation resolution",
    ],
  },
  {
    id: "03",
    icon: Cpu,
    title: "CLIP Encoder — Zero-Shot Classification",
    phase: "Phase 1",
    status: "active" as const,
    desc: "openai/clip-vit-large-patch14 · 768-dim visual embedding · No fine-tuning",
    details: [
      "ViT-L/14 backbone — 768-dim embedding",
      "Zero-shot image-text cosine similarity",
      "ITB-specific text prompts for lesion detection",
      "Decision Gate — Confidence ≥ θ (default 0.25)",
    ],
  },
  {
    id: "04",
    icon: Target,
    title: "SAM2 — Segment Anything Model 2",
    phase: "Phase 2",
    status: "planned" as const,
    desc: "facebook/sam2-hiera-large · Dense segmentation mask + bounding box overlay",
    details: [
      "CLIP → SAM2 bridge via attention map point prompts",
      "Dense pixel-wise mask + multi-granularity output",
      "NMS + mask refinement + temperature scaling",
      "Decision Gate — Detection F1 ≥ 0.85",
    ],
  },
  {
    id: "05",
    icon: FlaskConical,
    title: "YOLOv8 Fine-Tuning",
    phase: "Phase 3",
    status: "planned" as const,
    desc: "Manual gastroenterologist labels · Frozen CLIP backbone · Crohn's as hard negatives",
    details: [
      "Image-level binary labels — cheapest annotation strategy",
      "Orientation-aware loss: transverse vs longitudinal ulcers",
      "Real samples only: Kvasir-Capsule · HyperKvasir",
      "Target: Fine-Tuned F1 ≥ 0.91",
    ],
  },
  {
    id: "06",
    icon: Lightbulb,
    title: "Explainability Layer",
    phase: "Phase 4",
    status: "planned" as const,
    desc: "GradCAM heatmaps · Molmo visual reasoning · BioBERT structured report",
    details: [
      "GradCAM / Attention Rollout — heatmap overlay on frames",
      "Molmo (allenai/molmo-7b-d) — visual QA + reasoning",
      "BioBERT — structured clinical report generation",
      "Verify model attends to lesion features, not artifacts",
    ],
  },
  {
    id: "07",
    icon: Layers,
    title: "Late Fusion — Cross-Modal Attention",
    phase: "Multimodal",
    status: "planned" as const,
    desc: "Missing modality tolerant · Quality-aware weighting · Phased upgrade",
    details: [
      "Phase 1: Score-level logistic fusion — robust for <200 patients",
      "Phase 2: Embedding-level attention — upgrade at 200+ patients",
      "Quality-aware modality weighting",
      "Endoscopy + CT + WSI + Text → Fused embedding",
    ],
  },
  {
    id: "08",
    icon: BarChart3,
    title: "Output & Explainability",
    phase: "Outputs",
    status: "planned" as const,
    desc: "Calibrated · Localized · Actionable research decision support",
    details: [
      "Lesion Localization — BBox + seg. mask overlays",
      "ITB Suspicion Score — Calibrated patient-level probability",
      "Modality Attribution — Per-modality attention weights",
      "Three-tier threshold: Low / Moderate / High",
    ],
  },
];

const targetMetrics = [
  { label: "Detection F1", target: "≥ 0.85", week: "Week 1" },
  { label: "Seg. Dice", target: "≥ 0.80", week: "Week 2" },
  { label: "YOLOv8 F1", target: "≥ 0.91", week: "Week 3" },
  { label: "Multimodal AUC", target: "≥ 0.90", week: "Week 4" },
];

const WorkflowSection = () => {
  return (
    <div className="space-y-8 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Architecture</span>
        <h2 className="text-2xl font-semibold tracking-tight">Research Pipeline & Architecture</h2>
        <p className="text-sm text-muted-foreground">
          CLIP + SAM2 · Unimodal → Multimodal · Zero / Few-Shot · No Synthetic Data
        </p>
      </div>

      {/* External links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <a
          href="https://itbworkflow.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel glow-border p-5 flex items-center justify-between group hover:bg-card/80 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="glass-panel p-2.5 group-hover:border-primary/30 transition-colors">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Interactive System Workflow</p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">Full pipeline flowchart with walk-through →</p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="glass-panel glow-border p-5 flex items-center justify-between group hover:bg-card/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex items-center gap-4">
            <div className="glass-panel p-2.5 group-hover:border-primary/30 transition-colors">
              <GanttChart className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Gantt Chart — Project Timeline</p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">View milestones & schedule →</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-muted-foreground/50 px-2 py-0.5 border border-border/30 rounded-full">URL pending</span>
          </div>
        </a>
      </div>

      {/* Target Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {targetMetrics.map((m) => (
          <div key={m.label} className="glass-panel p-4 space-y-1 text-center">
            <p className="text-lg font-semibold text-primary font-mono">{m.target}</p>
            <p className="text-xs font-medium">{m.label}</p>
            <p className="text-[10px] text-muted-foreground font-mono">{m.week}</p>
          </div>
        ))}
      </div>

      {/* Pipeline blocks */}
      <div className="space-y-1">
        <span className="section-label">Research Pipeline — Extracted from System Workflow</span>
        <div className="space-y-0 mt-4">
          {pipelineBlocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <div key={block.id}>
                <div className="pipeline-block">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 flex flex-col items-center gap-1">
                      <div className="glass-panel p-2 rounded-lg">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-mono text-[10px] text-primary/60">{block.id}</span>
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-sm font-semibold">{block.title}</h3>
                        {block.status === "active" ? (
                          <span className="status-badge text-[9px]">Active</span>
                        ) : (
                          <span className="text-[9px] font-mono text-muted-foreground/50 border border-border/30 px-2 py-0.5 rounded-full">Planned</span>
                        )}
                        <span className="text-[9px] font-mono text-primary/40">{block.phase}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{block.desc}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1">
                        {block.details.map((d, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary/30 mt-1.5 shrink-0" />
                            <span className="text-[11px] text-muted-foreground/70 leading-relaxed">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {i < pipelineBlocks.length - 1 && <div className="pipeline-connector" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-panel p-3 border-l-2 border-l-primary/20">
        <p className="text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
          ⚠ No synthetic data — professor constraint. Training on real Kvasir-Capsule / HyperKvasir / CVC-ClinicDB samples only. 
          Pipeline data extracted from the Interactive System Workflow.
        </p>
      </div>
    </div>
  );
};

export default WorkflowSection;
