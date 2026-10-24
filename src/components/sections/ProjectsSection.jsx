import { lazy, Suspense, useState } from "react";
import projectsData from "../../data/projects.json";
import SafeImage from "../ui/SafeImage";
import SectionBookReveal from "../ui/SectionBookReveal";

const ProjectModal = lazy(() => import("./ProjectModal"));

function ProjectTile({ project, onClick }) {
  const { grid, variant } = project;
  const colSpan = grid?.colSpan ?? 1;
  const rowSpan = grid?.rowSpan ?? 1;

  const gridStyle = {
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
    minWidth: 0,
  };

  const baseClass =
    "glass-panel min-w-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:border-neon-cyan/30";

  if (variant === "text") {
    return (
      <button
        type="button"
        style={gridStyle}
        className={`${baseClass} relative flex flex-col justify-between p-6 text-left`}
        onClick={() => onClick(project)}
        aria-label={`View project: ${project.h2}`}
      >
        <h3 className="mt-6 break-words text-center font-display text-2xl font-black italic sm:mt-8 sm:text-3xl md:text-4xl">
          {project.overlayTitle || project.h2}
        </h3>
        <div className="mb-4 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white/50" />
          <div className="h-2 w-2 rounded-full bg-white/50" />
          <div className="h-2 w-2 rounded-full bg-white/50" />
        </div>
        <SafeImage
          src={project.imgUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-contain p-4 grayscale transition-all duration-500 hover:grayscale-0"
        />
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
        <SafeImage
          src={project.imgUrl}
          alt={project.h2}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-blue/80 to-transparent p-4 sm:p-6 lg:p-8">
          <h3 className="max-w-full break-words font-display text-2xl font-black leading-none text-dark-red opacity-50 transition-opacity group-hover:opacity-100 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
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
      <SafeImage
        src={project.imgUrl}
        alt={project.h2}
        loading="lazy"
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
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 md:gap-5">
          <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
            PROJECTs
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="rounded bg-neon-cyan/20 px-2 py-1 font-mono text-[10px] tracking-widest text-neon-cyan sm:text-xs">
              AI Engineering
            </span>
            <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] tracking-widest sm:text-xs">
              Digital Transformation
            </span>
            <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] tracking-widest sm:text-xs">
              Edtech
            </span>
            <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] tracking-widest sm:text-xs">
              HRM
            </span>
            <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] tracking-widest sm:text-xs">
              Personal
            </span>
          </div>
        </div>

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 md:auto-rows-[200px] lg:grid-cols-4">
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
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </>
  );
}
