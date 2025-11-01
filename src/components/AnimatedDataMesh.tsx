import { useEffect, useRef } from "react";

const AnimatedDataMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        nodeColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.18)",
        lineColor: isDark ? "rgba(255, 255, 255" : "rgba(0, 0, 0",
        clearColor: isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.02)",
        lineOpacity: isDark ? 0.1 : 0.15,
        lineWidth: isDark ? 0.5 : 0.65,
      };
    };

    let colors = getThemeColors();

    const resizeCanvas = () => {
      // Use container dimensions (main content area only)
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const drawMesh = () => {
      colors = getThemeColors();
      ctx.fillStyle = colors.clearColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors.nodeColor;
        ctx.fill();
      });

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `${colors.lineColor}, ${colors.lineOpacity * (1 - distance / 200)})`;
            ctx.lineWidth = colors.lineWidth;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawMesh);
    };

    resizeCanvas();
    initNodes();
    drawMesh();

    const handleResize = () => {
      resizeCanvas();
      initNodes();
    };

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      // Theme changed, colors will be updated in drawMesh
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-40"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

export default AnimatedDataMesh;
