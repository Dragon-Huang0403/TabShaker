import { RefObject, useState, useEffect } from 'react';

export default function useHook<T extends HTMLElement>(
  elementRef: RefObject<T>,
): boolean {
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    const handleMouseEnter = () => setIsHover(true);
    const handleMouseLeave = () => setIsHover(false);
    if (!elementRef.current) return undefined;
    elementRef.current.addEventListener('mouseenter', handleMouseEnter);
    elementRef.current.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      elementRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      elementRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return isHover;
}
