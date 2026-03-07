import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import ParticleBackground from "../components/ParticleBackground";

function Home() {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center transition-colors ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <ParticleBackground isDark={isDark} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Avatar */}
        <div className="mb-8">
          <img
            src="/pic/poom.jpg"
            alt="Phanupong Hookaew"
            className="w-60 h-60 mx-auto rounded-full object-cover shadow-lg ring-4 ring-blue-500/50"
          />
        </div>

        {/* Name & Title */}
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {t("home.greeting")}{" "}
          <span className="text-blue-400">{t("home.name")}</span>
        </h1>
        <p
          className={`text-xl mb-6 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("home.role")}
        </p>

        {/* Short Bio */}
        <p
          className={`leading-relaxed mb-8 max-w-xl mx-auto ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {t("home.bio")}
        </p>
        {/* My Skills */}

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "Git"].map(
            (skill) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  isDark
                    ? "bg-gray-700/50 text-blue-300 border-gray-600 hover:bg-gray-700"
                    : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                }`}
              >
                {skill}
              </span>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/projects"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/25"
          >
            {t("home.viewProjects")}
          </Link>
          <Link
            to="/contact"
            className={`px-8 py-3 border rounded-lg font-semibold transition ${
              isDark
                ? "border-gray-500 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t("home.contactMe")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
