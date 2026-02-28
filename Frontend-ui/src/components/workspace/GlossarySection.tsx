import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const terms = [
  { term: "Endoscopy", definition: "A medical procedure using a flexible tube with a camera (endoscope) to examine the interior of a body organ or cavity. In research contexts, endoscopic imaging provides visual data for computational analysis." },
  { term: "Lesion", definition: "A region of tissue that has suffered damage or abnormal change. In endoscopic imaging research, lesion localization refers to identifying spatial regions of interest within captured frames." },
  { term: "Polyp", definition: "A growth projecting from a mucous membrane surface. Polyps are commonly studied in endoscopic imaging datasets as they present distinct visual patterns amenable to computational detection." },
  { term: "Bounding Box", definition: "A rectangular region defined by coordinates used to spatially annotate areas of interest in an image. Common in object detection research for marking regions for analysis." },
  { term: "Heatmap", definition: "A data visualization technique using color gradients to represent the magnitude of values across a spatial region. In imaging research, heatmaps can indicate model attention or feature activation patterns." },
  { term: "Annotation", definition: "Metadata labels or markings added to images or datasets. Annotations provide ground-truth information used for training and evaluating computational models." },
  { term: "Segmentation", definition: "The process of partitioning an image into multiple segments or regions. In medical imaging research, segmentation is used to delineate structures or regions of interest at the pixel level." },
  { term: "Feature Extraction", definition: "The process of identifying and computing relevant characteristics or patterns from raw data. In image analysis, features might include texture, shape, color, or learned representations." },
];

const GlossarySection = () => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Reference</span>
        <h2 className="text-2xl font-semibold tracking-tight">Medical Terms & Concepts</h2>
        <p className="text-sm text-muted-foreground">
          A research-oriented glossary for key terminology. No diagnostic claims.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface-raised border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Term cards */}
      <div className="space-y-2">
        {filtered.map((item) => (
          <button
            key={item.term}
            onClick={() => setExpanded(expanded === item.term ? null : item.term)}
            className="w-full text-left glass-panel p-4 transition-colors hover:border-border"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.term}</span>
              {expanded === item.term ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            {expanded === item.term && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                {item.definition}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlossarySection;
