import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  // 1. State to track which graffiti head is currently active
  const [cursorIndex, setCursorIndex] = useState(11); // Start with yellow

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .group')) {
        setIsHovering(true);
        // 2. Randomly select a new icon index between 1 and 12 when hovering
        const nextIndex = Math.floor(Math.random() * 12) + 1;
        setCursorIndex(nextIndex);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('button, a, .group')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        marginTop: '-24px',
        marginLeft: '-24px'
      }}
    >
      {/* 3. Dynamically load the image based on cursorIndex */}
      <img 
        src={`/cursor (${cursorIndex}).png`} 
        alt="graffiti cursor"
        className={`w-13 h-15 transition-all duration-300 ${
          isHovering ? 'scale-125 rotate-12 brightness-110' : 'scale-100 rotate-0'
        }`}
      />
    </div>
  );
};

export default CustomCursor;