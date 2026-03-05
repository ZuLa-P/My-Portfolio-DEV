import { useEffect, useRef } from "react";

// สีแบบ Google Antigravity
const COLORS_DARK = [
  "#60a5fa", "#a78bfa", "#f472b6",
  "#34d399", "#fbbf24", "#fb7185", "#38bdf8",
];
const COLORS_LIGHT = [
  "#3b82f6", "#8b5cf6", "#ec4899",
  "#10b981", "#f59e0b", "#ef4444", "#0ea5e9",
];

function initParticles(count, w, h) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2.5 + 0.8,
    colorIndex: Math.floor(Math.random() * COLORS_DARK.length),
    opacity: Math.random() * 0.45 + 0.25,
    maxOpacity: Math.random() * 3 + 0.25,
    fadeState: "visible", // "visible" | "fadingOut" | "fadingIn"
  }));
}

export default function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], mouse: { x: -9999, y: -9999 }, isDark });

  // sync isDark without remounting
  useEffect(() => {
    stateRef.current.isDark = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stateRef.current.particles = initParticles(180, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("mouseleave", () => {
      stateRef.current.mouse = { x: -9999, y: -9999 };
    });

    const draw = () => {
      const { particles, mouse, isDark } = stateRef.current;
      const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }

        // Damping + clamp speed
        p.vx *= 0.97;
        p.vy *= 0.97;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 3) { p.vx = (p.vx / spd) * 3; p.vy = (p.vy / spd) * 3; }

        p.x += p.vx;
        p.y += p.vy;

        // Fade out เมื่อออกนอกขอบ แล้ว respawn ใหม่พร้อม fade in
        const margin = 40;
        const outOfBounds =
          p.x < -margin || p.x > canvas.width + margin ||
          p.y < -margin || p.y > canvas.height + margin;

        if (p.fadeState === "visible" && outOfBounds) {
          p.fadeState = "fadingOut";
        }

        if (p.fadeState === "fadingOut") {
          p.opacity -= 0.015;
          if (p.opacity <= 0) {
            // Respawn ที่ตำแหน่งใหม่ในพื้นที่ว่าง
            p.x = margin + Math.random() * (canvas.width - margin * 2);
            p.y = margin + Math.random() * (canvas.height - margin * 2);
            p.vx = (Math.random() - 0.5) * 0.4;
            p.vy = (Math.random() - 0.5) * 0.4;
            p.colorIndex = Math.floor(Math.random() * COLORS_DARK.length);
            p.maxOpacity = Math.random() * 0.45 + 0.25;
            p.opacity = 0;
            p.fadeState = "fadingIn";
          }
        }

        if (p.fadeState === "fadingIn") {
          p.opacity += 0.008;
          if (p.opacity >= p.maxOpacity) {
            p.opacity = p.maxOpacity;
            p.fadeState = "visible";
          }
        }

        if (p.opacity <= 0) return;

        // Draw crisp dot (no blur)
        const hex = Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[p.colorIndex] + hex;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
