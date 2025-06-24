import React, { useEffect, useRef, useState } from "react";
import "../css/ParallaxBackground.css";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
  const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lerp = (start: number, end: number, t: number) =>
      start + (end - start) * t;

    let animationFrameId: number;

    const animate = () => {
      setCurrentOffset((prev) => ({
        x: lerp(prev.x, targetOffset.x, 0.1),
        y: lerp(prev.y, targetOffset.y, 0.1),
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetOffset]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30;
    const y = ((e.clientY - top) / height - 0.5) * 30;
    setTargetOffset({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="parallax-container"
    >
      <div
        className="parallax-background"
        style={{
          top: `${-40 + currentOffset.y}px`,
          left: `${-40 + currentOffset.x}px`,
        }}
      />

      <div className="parallax-content">{children}</div>
    </div>
  );
};

export default ParallaxBackground;
