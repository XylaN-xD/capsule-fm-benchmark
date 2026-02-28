import { Microscope, FlaskConical, Database, Eye, Cpu, Target } from "lucide-react";

const OverviewSection = () => {
  return (
    <div className="space-y-10 animate-[fade-in_0.4s_ease-out]">
      {/* Header with dramatic spacing */}
      <div className="space-y-4">
        <span className="section-label">System Overview</span>
        <h2 className="text-4xl font-bold tracking-tight leading-tight">
          <span className="text-gradient-primary">Endoscopic Lesion</span>{" "}
          <span className="text-foreground">Localization</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed text-base">
          A research prototype for exploring spatial localization patterns in 
          endoscopic imaging datasets. Built on CLIP + SAM2 architecture for 
          zero-shot and few-shot detection of ITB mucosal lesions.
        </p>
      </div>

      {/* Status row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="status-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Active
        </span>
        <span className="research-badge">
          Research Prototype · Phase 1
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/40">
          CLIP + SAM2 · Unimodal → Multimodal
        </span>
      </div>

      {/* Capability cards — 3 column with better visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Database, title: "Dataset Ingestion", desc: "Upload and organize endoscopic imaging datasets for exploratory analysis", color: "text-primary" },
          { icon: Eye, title: "Visual Exploration", desc: "High-resolution viewing with experimental overlay capabilities for lesion regions", color: "text-primary" },
          { icon: FlaskConical, title: "Analytical Tools", desc: "Descriptive summaries and compositional analysis of datasets", color: "text-primary" },
          { icon: Microscope, title: "Research Context", desc: "Glossary, workflow documentation, and conceptual references for ITB research", color: "text-primary" },
          { icon: Cpu, title: "CLIP + SAM2 Pipeline", desc: "Zero-shot classification with visual-text embedding and dense segmentation", color: "text-primary" },
          { icon: Target, title: "Lesion Localization", desc: "Bounding box + segmentation mask overlays with attention heatmaps", color: "text-primary" },
        ].map((card) => (
          <div key={card.title} className="glass-panel p-5 space-y-3 group hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/[0.04] transition-colors duration-500" />
            <card.icon className={`w-5 h-5 ${card.color} relative z-10`} />
            <h3 className="text-sm font-semibold relative z-10">{card.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Key differential callout */}
      <div className="glass-panel glow-border p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">Key Research Differential</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          ITB shows transverse ulcers at the ileocaecal junction. Crohn's disease shows longitudinal ulcers. 
          The model must learn orientation-sensitive features to distinguish between these conditions.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="glass-panel p-4 border-l-2 border-l-primary/30">
        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
          ⚠ This system is a research prototype for exploratory analysis and visualization. 
          It is not intended for clinical diagnosis, treatment planning, or medical decision-making. 
          All outputs are experimental and should be interpreted within a research context.
        </p>
      </div>
    </div>
  );
};

export default OverviewSection;
