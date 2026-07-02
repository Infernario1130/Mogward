import React, { forwardRef } from 'react';
import { Card } from './Card';

export const Pair = forwardRef(({ pair, cardWidth, height, gap, accentColor, style, priority = false }, ref) => {
  const pairW = cardWidth * 2 + gap;
  return (
    <div
      ref={ref}
      className="flex items-center absolute top-0"
      style={{
        width: pairW,
        height,
        gap,
        willChange: 'transform, opacity',
        transformOrigin: 'center center',
        ...style
      }}
    >
      {pair.map((card, i) => (
        <Card
          key={i}
          card={card}
          width={cardWidth}
          height={height}
          accentColor={accentColor}
          badge={i === 0 ? 'BEFORE' : 'AFTER'}
          founder={card.founder}
          priority={priority}
        />
      ))}
    </div>
  );
});