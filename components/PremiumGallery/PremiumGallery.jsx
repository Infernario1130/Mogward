import React, { useMemo } from 'react';
import { Pair } from './Pair';
import { useInfiniteTrack } from './useInfiniteTrack';
import { useResponsiveCardWidth, useIsMobile } from './helpers';

export function PremiumGallery({
  pairs,
  className = "",
  cardWidth = 340,
  aspectRatio = 1.55,
  pairGap = 14,
  accentColor = "#9400D3",
}) {
  const count = pairs.length;
  const isMobile = useIsMobile();
  const w = useResponsiveCardWidth(cardWidth);
  const gap = isMobile ? Math.max(6, pairGap / 2) : pairGap;
  const pairWidth = w * 2 + gap;
  const originalNeighborScale = 1 / 1.5;
  const stride = pairWidth / 2 + (pairWidth * originalNeighborScale) / 2 - 40;
  const height = w * aspectRatio;
  const totalCopies = 5;

  const allPairs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalCopies; i++) {
      arr.push(...pairs);
    }
    return arr;
  }, [pairs, totalCopies]);

  const {
    containerRef,
    itemsRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useInfiniteTrack({
    count,
    pairWidth,
    stride,
    totalCopies,
  });

  if (count === 0) return null;

  return (
    <div className={`relative w-full overflow-hidden select-none py-10 ${className}`}>
      <div
        className="relative mx-auto"
        style={{ height: height + 24 }}
      >
        <div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div ref={containerRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
            {allPairs.map((pair, i) => (
              <Pair
                key={i}
                ref={(el) => itemsRef.current[i] = el}
                pair={pair}
                cardWidth={w}
                height={height}
                gap={gap}
                accentColor={accentColor}
                style={{ left: i * stride }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}