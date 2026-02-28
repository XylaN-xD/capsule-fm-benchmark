import { Lightbulb, ArrowRight } from "lucide-react";

const prompts = [
  { category: "Dataset", prompt: "What types of endoscopic images are included in the current dataset?", desc: "Explore the composition and characteristics of the loaded imaging data." },
  { category: "Annotation", prompt: "How are lesion regions annotated in the dataset?", desc: "Understand the spatial labeling methodology used for research annotations." },
  { category: "Workflow", prompt: "What are the main stages of the research pipeline?", desc: "Review the end-to-end workflow from data collection to visualization." },
  { category: "Visualization", prompt: "How should the heatmap overlay be interpreted?", desc: "Learn about the experimental attention visualization and its limitations." },
  { category: "Concepts", prompt: "What is the difference between detection and segmentation?", desc: "Compare spatial analysis approaches used in medical imaging research." },
  { category: "Limitations", prompt: "What are the current limitations of this research prototype?", desc: "Understand the scope and constraints of the exploratory system." },
];

const PromptsSection = () => {
  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Exploration</span>
        <h2 className="text-2xl font-semibold tracking-tight">Research Prompts</h2>
        <p className="text-sm text-muted-foreground">
          Example queries to guide thoughtful exploration of the research system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((item) => (
          <div key={item.prompt} className="prompt-card group space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-primary/70 uppercase tracking-wider">
                {item.category}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
            </div>
            <p className="text-sm font-medium leading-snug">{item.prompt}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-4 flex items-start gap-3">
        <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          These prompts are designed to encourage exploration of the research system's 
          capabilities and concepts. They do not produce diagnostic or clinical outputs.
        </p>
      </div>
    </div>
  );
};

export default PromptsSection;
