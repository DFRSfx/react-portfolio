import { useEffect, useRef, useState } from "react";

/**
 * Thin animated scroll-progress bar fixed on the right side, centred vertically.
 * The fill grows from top to bottom as the user scrolls the page.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, next)));
      frameRef.current = 0;
    };

    const onScrollOrResize = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="scrollProgress">
      <div className="scrollProgressTrack">
        <div
          className="scrollProgressFill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
