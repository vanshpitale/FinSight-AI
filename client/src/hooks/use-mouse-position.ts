import { useState, useEffect } from "react";

export interface MousePosition {
  x: number; // Normalized coordinate: -0.5 (left) to 0.5 (right)
  y: number; // Normalized coordinate: -0.5 (top) to 0.5 (bottom)
  clientX: number; // Raw viewport pixel x
  clientY: number; // Raw viewport pixel y
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position relative to window center
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      setMousePosition({
        x,
        y,
        clientX,
        clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}
