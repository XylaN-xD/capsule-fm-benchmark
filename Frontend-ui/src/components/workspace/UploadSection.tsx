import { useState, useCallback } from "react";
import { Upload, FileImage, FileJson, FileArchive, X, HardDrive } from "lucide-react";

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

const fileTypeIcon = (name: string) => {
  if (/\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(name)) return FileImage;
  if (/\.(json|csv)$/i.test(name)) return FileJson;
  if (/\.(zip|tar|gz|rar)$/i.test(name)) return FileArchive;
  return HardDrive;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadSection = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      type: f.type || "unknown",
      size: f.size,
      uploadedAt: new Date(),
    }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).map((f) => ({
      name: f.name,
      type: f.type || "unknown",
      size: f.size,
      uploadedAt: new Date(),
    }));
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Dataset Management</span>
        <h2 className="text-2xl font-semibold tracking-tight">Upload & Organize</h2>
        <p className="text-sm text-muted-foreground">
          Ingest imaging datasets and structured files for exploration and analysis.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`drop-zone text-center space-y-4 ${isDragging ? "drop-zone-active" : ""}`}
      >
        <div className="glass-panel inline-flex p-4 rounded-xl">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Drop files here or browse</p>
          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG, JSON, CSV, ZIP
          </p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-primary border border-primary/30 rounded-md cursor-pointer hover:bg-primary/5 transition-colors">
          Browse Files
          <input
            type="file"
            multiple
            className="hidden"
            accept=".jpg,.jpeg,.png,.json,.csv,.zip"
            onChange={handleFileInput}
          />
        </label>
      </div>

      {/* File table */}
      {files.length > 0 && (
        <div className="glass-panel overflow-hidden">
          <div className="px-4 py-3 border-b border-border/50">
            <span className="text-xs font-mono text-muted-foreground">
              {files.length} file{files.length !== 1 ? "s" : ""} loaded
            </span>
          </div>
          <div className="divide-y divide-border/30">
            {files.map((file, i) => {
              const Icon = fileTypeIcon(file.name);
              return (
                <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-raised/50 transition-colors">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm flex-1 truncate">{file.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{formatSize(file.size)}</span>
                  <span className="text-xs font-mono text-muted-foreground/60">
                    {file.uploadedAt.toLocaleTimeString()}
                  </span>
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
