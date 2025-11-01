import { useState, useRef, useEffect } from "react";
import { FileText, Upload, Download, Trash2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RFPFlowTimeline from "@/components/RFPFlowTimeline";
import RFPSummaryAccordion from "@/components/RFPSummaryAccordion";
import AIAssistantPanel from "@/components/AIAssistantPanel";
import { MOCK_RFP_PROJECTS } from "@/lib/mockData";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RFPLifecycle = () => {
  const [projects, setProjects] = useState(MOCK_RFP_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [processingProjects, setProcessingProjects] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProjectClick = (projectId: string) => {
    // Toggle selection: if clicking the same project, deselect it
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(projectId);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      setProjects(projects.filter((p) => p.id !== projectToDelete));
      if (selectedProjectId === projectToDelete) {
        setSelectedProjectId(null);
      }
      toast.success("Project deleted successfully");
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF file
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    // Generate a unique ID for the new project
    const newProjectId = `new-${Date.now()}`;
    
    // Create a title from filename (remove extension and format)
    const fileNameWithoutExt = file.name.replace(/\.pdf$/i, "");
    const formattedTitle = fileNameWithoutExt
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Create new project entry
    const newProject = {
      id: newProjectId,
      rfpTitle: formattedTitle,
      uploadedFileName: file.name,
      tabs: [],
      journeyBlocks: [
        { name: "RFP Received", status: "pending" as const, icon: "FileText" },
        { name: "Initial Analysis", status: "pending" as const, icon: "Search" },
        { name: "Scope Definition", status: "pending" as const, icon: "Target" },
        { name: "Cost Estimation", status: "pending" as const, icon: "Calculator" },
        { name: "Resource Planning", status: "pending" as const, icon: "Users" },
        { name: "Risk Assessment", status: "pending" as const, icon: "AlertTriangle" },
        { name: "Proposal Draft", status: "pending" as const, icon: "FileEdit" },
        { name: "Legal Review", status: "pending" as const, icon: "Scale" },
        { name: "Final Approval", status: "pending" as const, icon: "CheckCircle" },
        { name: "Submission", status: "pending" as const, icon: "Send" },
      ],
    };

    // Add project to list
    setProjects((prev) => [newProject, ...prev]);

    // Mark as processing
    setProcessingProjects((prev) => new Set(prev).add(newProjectId));

    // Reset file input
    e.target.value = "";

    toast.success("RFP uploaded successfully");
  };

  // Handle processing completion after 10 seconds
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    processingProjects.forEach((projectId) => {
      const timer = setTimeout(() => {
        setProcessingProjects((prev) => {
          const newSet = new Set(prev);
          newSet.delete(projectId);
          return newSet;
        });

        // Update project journey blocks to show some progress
        setProjects((prev) =>
          prev.map((project) => {
            if (project.id === projectId) {
              return {
                ...project,
                journeyBlocks: project.journeyBlocks.map((block, index) =>
                  index === 0
                    ? { ...block, status: "completed" as const }
                    : index === 1
                    ? { ...block, status: "in-progress" as const }
                    : block
                ),
              };
            }
            return project;
          })
        );

        toast.success("RFP processing completed successfully!");
      }, 10000); // 10 seconds

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [processingProjects]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">RFP Lifecycle</h1>
          <p className="text-muted-foreground">
            AI-powered analysis and estimation for your proposals
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Project Cards List */}
        <div className="flex flex-col gap-4">
          {/* Upload New RFP Card - First in List */}
          <Card
            className="gradient-card p-6 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-elegant border-dashed border-2"
            onClick={handleUploadClick}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold mb-1">Upload New RFP</h2>
                <p className="text-sm text-muted-foreground">
                  Click to upload a new RFP document for analysis
                </p>
              </div>
            </div>
          </Card>

          {/* Existing Projects */}
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col gap-4">
              <Card
                className={`gradient-card p-6 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-elegant ${
                  selectedProjectId === project.id
                    ? "border-foreground/30 shadow-elegant"
                    : ""
                }`}
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-1 truncate">{project.rfpTitle}</h2>
                    <p className="text-sm text-muted-foreground truncate">
                      Uploaded: {project.uploadedFileName}
                    </p>
                  </div>
                  {processingProjects.has(project.id) ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing</span>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                      onClick={(e) => handleDeleteClick(e, project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>

              {/* RFP Details - Shown directly below the selected project */}
              {selectedProjectId === project.id && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Panel - RFP Flow */}
                  <div className="lg:col-span-1">
                    <Card className="gradient-card p-6 sticky top-6">
                      <RFPFlowTimeline blocks={project.journeyBlocks} />
                    </Card>
                  </div>

                  {/* Center/Right Panel - Content */}
                  <div className="lg:col-span-2">
                    <div className="relative">
                      {/* Fixed Download Button */}
                      <div className="absolute top-0 right-0 z-10">
                        <Button
                          variant="outline"
                          className="gap-2 shadow-elegant"
                          onClick={() => toast.success("RFP Summary downloaded successfully!")}
                        >
                          <Download className="h-4 w-4" />
                          Download Summary
                        </Button>
                      </div>

                      <RFPSummaryAccordion tabs={project.tabs} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State - When no projects exist */}
        {projects.length === 0 && (
          <Card className="gradient-card p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No projects uploaded yet</p>
            <Button className="gap-2" onClick={handleUploadClick}>
              <Upload className="h-4 w-4" />
              Upload New RFP
            </Button>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Floating AI Assistant */}
      <AIAssistantPanel />
    </div>
  );
};

export default RFPLifecycle;
