import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export function useInfiniteTrack({
  count,
  pairWidth,
  stride,
  totalCopies = 5,
  dragMultiplier = 1,
  momentumMultiplier = 200,
  onActiveIndexChange,
}) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  
  const proxy = useRef({ x: 0 }).current;
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastXRef = useRef(0);

  const activeIndexRef = useRef(-1);
  
  const containerWidth = count * stride;

  const updateVisuals = useCallback((x) => {
    if (!containerRef.current) return;
    
    containerRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    
    const viewportCenter = window.innerWidth / 2;

    let minDist = Infinity;
    let minIndex = 0;
    
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const itemCenter = x + i * stride + pairWidth / 2;
      const dist = Math.abs(itemCenter - viewportCenter);

      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
      
      const maxDist = stride;
      const progress = Math.min(dist / maxDist, 1); 
      
      const scale = 1 - (1-1/1.5) * progress;
      const opacity = 1 - 0.4 * progress; 
      
      el.style.transform = `scale(${scale})`;
      el.style.opacity = opacity.toString();
      el.style.zIndex = progress < 0.5 ? '30' : '10';
    });

    const activePairIndex = ((minIndex % count) + count) % count;
    if (activePairIndex !== activeIndexRef.current) {
      activeIndexRef.current = activePairIndex;
      onActiveIndexChange?.(activePairIndex);
    }
  }, [pairWidth, stride, count, onActiveIndexChange]);

  const wrapXIfNeeded = useCallback(() => {
    const viewportCenter = window.innerWidth / 2;
    const baseX = viewportCenter - 2.5 * containerWidth;
    let shift = 0;
    
    if (proxy.x - baseX > containerWidth / 2) {
      shift = -containerWidth;
    } else if (proxy.x - baseX < -containerWidth / 2) {
      shift = containerWidth;
    }
    
    if (shift !== 0) {
      proxy.x += shift;
      startXRef.current += shift;
      updateVisuals(proxy.x);
    }
  }, [containerWidth, updateVisuals, proxy]);

  useEffect(() => {
    const viewportCenter = window.innerWidth / 2;
    const i = 2 * count;
    proxy.x = viewportCenter - (i * stride + pairWidth / 2);
    updateVisuals(proxy.x);
    
    const ticker = gsap.ticker.add(() => {
      if (isDraggingRef.current) {
        const now = performance.now();
        const dt = now - lastTimeRef.current;
        if (dt > 0) {
          const dx = proxy.x - lastXRef.current;
          const instantVelocity = dx / dt;
          velocityRef.current = velocityRef.current * 0.5 + instantVelocity * 0.5;
        }
        lastTimeRef.current = now;
        lastXRef.current = proxy.x;
      }
    });
    
    return () => gsap.ticker.remove(ticker);
  }, [count, stride, pairWidth, updateVisuals, proxy]);

  const handlePointerDown = useCallback((e) => {
    gsap.killTweensOf(proxy);
    isDraggingRef.current = true;
    startXRef.current = proxy.x - e.clientX * dragMultiplier;
    
    velocityRef.current = 0;
    lastTimeRef.current = performance.now();
    lastXRef.current = proxy.x;
    
    wrapXIfNeeded();
  }, [dragMultiplier, proxy, wrapXIfNeeded]);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    proxy.x = startXRef.current + e.clientX * dragMultiplier;
    updateVisuals(proxy.x);
    wrapXIfNeeded();
  }, [dragMultiplier, proxy, updateVisuals, wrapXIfNeeded]);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    const viewportCenter = window.innerWidth / 2;
    const velocity = velocityRef.current;
    
    const targetX = proxy.x + velocity * momentumMultiplier;
    
    const desiredI = (viewportCenter - targetX - pairWidth / 2) / stride;
    const snappedI = Math.round(desiredI);
    
    const snappedTargetX = viewportCenter - (snappedI * stride + pairWidth / 2);
    
    gsap.to(proxy, {
      x: snappedTargetX,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        updateVisuals(proxy.x);
      },
      onComplete: () => {
        wrapXIfNeeded();
      }
    });
  }, [momentumMultiplier, pairWidth, stride, proxy, updateVisuals, wrapXIfNeeded]);

  return {
    containerRef,
    itemsRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}