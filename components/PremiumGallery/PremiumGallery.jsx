import React, { useMemo, useState } from 'react';
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
  eyebrow = "RESULTS",
  heading = "Real clients. Real numbers.",
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

  const [activeIndex, setActiveIndex] = useState(0);

  const allPairs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalCopies; i++) {
      arr.push(...pairs.map(p =>
        p.images.map((src, idx) => ({
          image: src,
          founder: p.founderCard === idx,
        }))
      ));
    }
    return arr;
  }, [pairs, totalCopies]);

  // Index of the pair that's centered on initial mount (middle copy, item 0)
  const initialPairIndex = 2 * count;

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
    onActiveIndexChange: setActiveIndex,
  });

  if (count === 0) return null;

  const active = pairs[activeIndex];

  return (
    <div className={`relative w-full overflow-hidden select-none py-10 ${className}`}>
      <div className="text-center mb-10 px-4">
        <p
          className="text-xs sm:text-sm font-extrabold tracking-[0.3em] mb-3"
          style={{ color: accentColor }}
        >
          {eyebrow}
        </p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
          {heading}
        </h2>
      </div>

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
                priority={i === initialPairIndex}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 px-4 max-w-lg mx-auto">
        <h3 className="font-black text-3xl sm:text-4xl tracking-tight text-white mb-2">
          {active.name}
        </h3>
        <p className="text-neutral-400 text-sm font-semibold mb-3">
          {active.tags}
        </p>
        <p className="font-black text-lg mb-4" style={{ color: accentColor }}>
          {active.stats}
        </p>
        <p className="italic text-neutral-300 leading-relaxed">
          {active.quote}
        </p>
      </div>
    </div>
  );
}