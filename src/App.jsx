import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#000000" : "#f9fafb";
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "bg-black" : "bg-gray-50"}`}>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
