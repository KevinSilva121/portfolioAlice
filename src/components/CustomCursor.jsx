import { useState, useEffect } from 'react';
import { m as Motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useClient';
import './CustomCursor.css';

// Mesmo critério do CSS (CustomCursor.css esconde o cursor nativo a partir de 769px).
const DESKTOP_QUERY = '(min-width: 769px)';

const CustomCursor = () => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('faq-question')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isDesktop]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: "rgba(212, 175, 55, 0.1)",
      border: "1px solid rgba(212, 175, 55, 1)"
    }
  };

  // Só no desktop (no celular não há mouse); no HTML gerado no build também não aparece.
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <Motion.div
        className="cursor-dot"
        aria-hidden="true"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <Motion.div
        className="cursor-ring"
        aria-hidden="true"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
