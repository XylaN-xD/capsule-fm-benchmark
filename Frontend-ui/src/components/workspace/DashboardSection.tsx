import { BarChart3, Database, FileImage, FileJson } from "lucide-react";

const StatCard = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="glass-panel p-5 space-y-2 group hover:border-primary/20 transition-all duration-300">
    <span className="section-label">{label}</span>
    <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{sub}</p>
  </div>
);

const DashboardSection = () => {
  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Analysis Dashboard</span>
        <h2 className="text-2xl font-semibold tracking-tight">Dataset Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Descriptive summaries and compositional analysis of loaded datasets.
        </p>
      </div>

      {/* Stat cards — empty state */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Files" value="—" sub="No dataset loaded" />
        <StatCard label="Images" value="—" sub="Upload to populate" />
        <StatCard label="Annotations" value="—" sub="Awaiting data" />
        <StatCard label="Avg. Resolution" value="—" sub="Pending analysis" />
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel p-5 space-y-4">
          <span className="section-label">File Type Distribution</span>
          <div className="h-52 flex items-center justify-center">
            <div className="text-center space-y-3">
              <BarChart3 className="w-8 h-8 text-muted-foreground/20 mx-auto" />
              <p className="text-xs text-muted-foreground/50 font-mono">Upload a dataset to view distribution</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 space-y-4">
          <span className="section-label">Dataset Composition</span>
          <div className="h-52 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Database className="w-8 h-8 text-muted-foreground/20 mx-auto" />
              <p className="text-xs text-muted-foreground/50 font-mono">No composition data available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-3 border-l-2 border-l-primary/20">
        <p className="text-[10px] text-muted-foreground/60 font-mono leading-relaxed">
          Analytics will populate once datasets are uploaded and processed. All metrics are descriptive and exploratory.
        </p>
      </div>
    </div>
  );
};

export default DashboardSection;
