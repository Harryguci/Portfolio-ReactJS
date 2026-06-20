import { useState } from "react";
import projectsData from "../../data/projects.json";
import SectionBookReveal from "../ui/SectionBookReveal";
import ProjectModal from "./ProjectModal";

function ProjectTile({ project, onClick }) {
  const { grid, variant } = project;
  const colSpan = grid?.colSpan ?? 1;
  const rowSpan = grid?.rowSpan ?? 1;

  const gridStyle = {
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
  };

  const baseClass =
    "glass-panel cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:border-neon-cyan/30";

  if (variant === "text") {
    return (
      <button
        type="button"
        style={gridStyle}
        className={`${baseClass} relative flex flex-col justify-between p-6 text-left`}
        onClick={() => onClick(project)}
        aria-label={`View project: ${project.h2}`}
      >
        <h3 className="mt-8 text-center font-display text-4xl font-black italic">
          {project.overlayTitle || project.h2}
        </h3>
        <div className="mb-4 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white/50" />
          <div className="h-2 w-2 rounded-full bg-white/50" />
          <div className="h-2 w-2 rounded-full bg-white/50" />
        </div>
        {project.imgUrl && (
          <img
            src={project.imgUrl}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-contain p-4 grayscale transition-all duration-500 hover:grayscale-0"
          />
        )}
      </button>
    );
  }

  if (variant === "overlay") {
    return (
      <button
        type="button"
        style={gridStyle}
        className={`${baseClass} group relative`}
        onClick={() => onClick(project)}
        aria-label={`View project: ${project.h2}`}
      >
        <img
          src={project.imgUrl}
          alt={project.h2}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-blue/80 to-transparent p-8">
          <h3 className="font-display text-4xl font-black text-dark-red opacity-50 transition-opacity group-hover:opacity-100 md:text-6xl">
            {project.overlayTitle || project.h2}
          </h3>
        </div>
      </button>
    );
  }

  if (variant === "brand") {
    return (
      <button
        type="button"
        style={gridStyle}
        className={`${baseClass} flex items-center justify-center bg-dark-red`}
        onClick={() => onClick(project)}
        aria-label={`View project: ${project.h2}`}
      >
        <span className="font-display text-2xl font-black text-black">
          {project.brandLabel || "HG"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      style={gridStyle}
      className={`${baseClass} group`}
      onClick={() => onClick(project)}
      aria-label={`View project: ${project.h2}`}
    >
      <img
        src={project.imgUrl}
        alt={project.h2}
        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
      />
    </button>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <SectionBookReveal id="projects" className="mb-32 py-16">
        <div className="mb-12 flex items-baseline gap-4">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
            RECAP PROJECT {new Date().getFullYear()}
          </h2>
          <span className="rounded bg-white/10 px-2 py-1 font-mono text-xs tracking-widest">
            NO AI
          </span>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {projectsData.map((project) => (
            <ProjectTile
              key={project.h2}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </SectionBookReveal>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
