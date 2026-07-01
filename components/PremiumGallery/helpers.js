import { useState, useEffect } from 'react';

export function useResponsiveCardWidth(base) {
  const [w, setW] = useState(base);
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      if (vw < 480) setW(Math.min(base, vw * 0.34));
      else if (vw < 768) setW(Math.min(base, vw * 0.3));
      else if (vw < 1100) setW(Math.min(base, vw * 0.2));
      else setW(base);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [base]);
  return w;
}

export function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const compute = () => setM(window.innerWidth < 640);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return m;
}