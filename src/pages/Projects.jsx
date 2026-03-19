import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import ParticleBackground from "../components/ParticleBackground";
import Loading from "../components/Loading";
import { projectsAPI } from "../services/api";


const getLang = (field, lang) => {
  if (field && typeof field === "object") return field[lang] ?? field.en ?? "";
  return field ?? "";
};

function Projects() {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) ?? "en";
  const [projectsMeta, setProjectsMeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((data) => {
        setProjectsMeta(Array.isArray(data) ? data : data?.data ?? data?.projects ?? []);
      })
      .catch((err) => console.warn("Using fallback projects:", err.message))
      .finally(() => setLoading(false));
  }, []);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!projectsMeta) return;
    setProjects(projectsMeta.map((meta) => ({
      ...meta,
      title: getLang(meta.headers, lang),
      description: getLang(meta.caption, lang),
    })));
  }, [projectsMeta, lang]);


  return (
    <section
      className={`relative min-h-screen py-20 px-6 transition-colors ${
        isDark ? "bg-black" : "bg-gray-50"
      }`}
    >
      <ParticleBackground isDark={isDark} />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("projects.title")}
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Project Cards */}
        {loading ? (
          <Loading />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(projects ?? []).map((project, index) => (
            <Link
              to={`/projects/${index}`}
              key={index}
              className={`block rounded-xl p-6 border transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer ${
                isDark
                  ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
            >
              {/* Project Thumbnail */}
              <div className="w-full h-64 rounded-lg mb-5 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isDark
                        ? "bg-gradient-to-br from-gray-700 to-gray-600"
                        : "bg-gradient-to-br from-gray-200 to-gray-100"
                    }`}
                  >
                    <span className="text-4xl">🖥️</span>
                  </div>
                )}
              </div>

              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {getLang(project.headers, lang)}
              </h3>
              <p
                className={`mb-4 leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {getLang(project.caption, lang)}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(project.tech ?? []).map((tech) => (
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
{project.github && (                <a
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
                </a>)}
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
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
