import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import ParticleBackground from "../components/ParticleBackground";

const projectsData = [
  {
    id: 0,
    tech: ["React", "Tailwind CSS"],
    github: "https://github.com/ZuLa-P/My-Portfolio-DEV",
    demo: "https://phanuphong.vercel.app/",
    gallery: [
      { image: "/pic/portfoilo.PNG", captionKey: "projects.detail.0.captions.0" },
      
    ],
  },
  {
    id: 1,
    tech: ["React", "Tailwind CSS", "Express"],
    github: "https://github.com/ZuLa-P/YoutubeDowload",
    demo: "",
    gallery: [
      { image: "/pic/youtube.PNG", captionKey: "projects.detail.1.captions.0" },
    ],
  },
  {
    id: 2,
    tech: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Docker"],
    github: "",
    demo: "",
    gallery: [
      { image: "/pic/sms2pro.PNG", captionKey: "projects.detail.2.captions.0" },
    ],
  },
];

function ProjectDetail() {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const project = projectsData[Number(id)];

  if (!project) {
    return (
      <section
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project not found</h2>
          <Link
            to="/projects"
            className="text-blue-500 hover:underline"
          >
            ← {t("projects.detail.backToProjects")}
          </Link>
        </div>
      </section>
    );
  }

  const title = t(`projects.items.${id}.title`);
  const description = t(`projects.items.${id}.description`);

  return (
    <section
      className={`relative min-h-screen py-20 px-6 transition-colors ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <ParticleBackground isDark={isDark} />
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/projects"
          className={`inline-flex items-center gap-2 mb-8 text-sm transition ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("projects.detail.backToProjects")}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-lg mb-6 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 text-xs rounded-full border ${
                  isDark
                    ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                    : "bg-blue-50 text-blue-600 border-blue-200"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 text-sm transition ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 text-sm transition ${
                  isDark
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 gap-8">
          {project.gallery.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden border transition-all ${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <img
                src={item.image}
                alt={`${title} screenshot ${index + 1}`}
                className="w-full h-auto object-cover"
              />
              <div className="p-5">
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t(item.captionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
