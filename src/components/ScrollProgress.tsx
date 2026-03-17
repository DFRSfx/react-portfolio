import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Thin animated scroll-progress bar fixed on the right side, centred vertically.
 * The fill grows from top to bottom as the user scrolls the page.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

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

  const handleDrag = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = clientY - rect.top;
    let newProgress = clickY / rect.height;
    newProgress = Math.min(1, Math.max(0, newProgress));

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: newProgress * maxScroll,
      behavior: "auto",
    });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    handleDrag(e.clientY);
  }, [handleDrag]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    handleDrag(e.clientY);
  }, [handleDrag]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div className="scrollProgress">
      <div 
        className="scrollProgressTrack"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="scrollProgressFill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
