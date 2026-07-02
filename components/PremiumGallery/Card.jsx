import React from 'react';
import Image from 'next/image';

export function Card({ card, width, height, accentColor, badge, founder, priority = false }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl pointer-events-none animate-glow-pulse bg-black"
      style={{
        width, height,
        border: `2.5px solid ${accentColor}`,
        boxShadow: '0 0 10px rgba(148,0,211,0.35), 0 0 20px rgba(148,0,211,0.15)'
      }}
    >
      <div className="absolute bottom-2 left-2 z-20 flex flex-col gap-1.5">
        {badge && (
          <span
            className="text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full tracking-wide text-white w-fit"
            style={{ backgroundColor: badge === 'AFTER' ? accentColor : 'rgba(64,64,64,0.85)' }}
          >
            {badge}
          </span>
        )}
        {founder && (
          <span
            className="text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full tracking-wide text-white w-fit"
            style={{ backgroundColor: accentColor }}
          >
            FOUNDER
          </span>
        )}
      </div>
      <Image
        src={card.image}
        alt={card.title || ''}
        fill
        priority={priority}
        className="object-cover"
        sizes={`${width}px`}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        {card.subtitle && (
          <p className="mb-1 text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color: accentColor }}>
            {card.subtitle}
          </p>
        )}
        {card.title && (
          <h3 className="text-base sm:text-lg font-black leading-tight tracking-tight text-white">
            {card.title}
          </h3>
        )}
      </div>
    </div>
  );
}