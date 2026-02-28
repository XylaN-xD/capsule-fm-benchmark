import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Layers, Eye, EyeOff } from "lucide-react";

const ImageExplorer = () => {
  const [zoom, setZoom] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Image Exploration</span>
        <h2 className="text-2xl font-semibold tracking-tight">Visual Analysis Viewer</h2>
        <p className="text-sm text-muted-foreground">
          Explore endoscopic images with experimental overlays and annotations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        {/* Viewer */}
        <div className="glass-panel overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
            <span className="text-xs font-mono text-muted-foreground">sample_endoscopy_001.jpg</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setZoom(1)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="relative aspect-[4/3] bg-background/50 flex items-center justify-center overflow-hidden">
            <div
              className="relative transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Placeholder for actual image */}
              <div className="w-[512px] h-[384px] ambient-grid-fine rounded flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Layers className="w-8 h-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-xs text-muted-foreground/40 font-mono">No image loaded</p>
                  <p className="text-[10px] text-muted-foreground/30 font-mono">Upload a dataset to begin exploration</p>
                </div>
              </div>

              {/* Overlay visualization */}
              {showOverlay && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-[30%] left-[35%] w-24 h-20 border-2 border-primary/50 rounded-lg">
                    <span className="absolute -top-5 left-0 text-[9px] font-mono text-primary bg-background/80 px-1.5 py-0.5 rounded">
                      Region A · 0.82
                    </span>
                  </div>
                </div>
              )}

              {/* Heatmap visualization */}
              {showHeatmap && (
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute top-[25%] left-[30%] w-32 h-28 rounded-full bg-gradient-radial from-primary/60 via-primary/20 to-transparent blur-xl" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls sidebar */}
        <div className="space-y-4">
          <div className="glass-panel p-4 space-y-4">
            <span className="section-label">Overlays</span>
            <div className="space-y-3">
              <button
                onClick={() => setShowOverlay(!showOverlay)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  showOverlay ? "bg-primary/10 text-primary border border-primary/20" : "bg-surface-raised text-muted-foreground hover:text-foreground"
                }`}
              >
                {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                Lesion Regions
              </button>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  showHeatmap ? "bg-primary/10 text-primary border border-primary/20" : "bg-surface-raised text-muted-foreground hover:text-foreground"
                }`}
              >
                {showHeatmap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                Heatmap
              </button>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-3">
            <span className="section-label">Legend</span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-primary/50 rounded-sm" />
                <span className="text-muted-foreground">Detected region (experimental)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <span className="text-muted-foreground">Attention heatmap</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-3 border-l-2 border-l-primary/20">
            <p className="text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
              All overlays are experimental outputs for research exploration only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageExplorer;
