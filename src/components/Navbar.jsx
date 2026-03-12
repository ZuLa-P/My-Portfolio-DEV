import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { useLang } from "../context/LanguageContext";

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors ${
        isDark
          ? "bg-gray-900/80 border-gray-800"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`text-xl font-bold transition ${
            isDark
              ? "text-white hover:text-blue-400"
              : "text-gray-900 hover:text-blue-600"
          }`}
        >
          {"<Dev />"}
        </Link>

        {/* Nav Links + Controls */}
        <div className="flex items-center gap-4">
          {/* Links */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition ${
                location.pathname === link.to
                  ? "text-blue-400"
                  : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div
            className={`w-px h-5 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          />

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            title={lang === "en" ? "Switch to Thai" : "Switch to English"}
          >
            {lang === "en" ? "EN" : "TH"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
              isDark
                ? "bg-gray-800 text-gray-700 hover:bg-gray-700 hover:text-yellow-400"
                : "bg-gray-100 text-yellow-400 hover:bg-gray-200"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>

            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
