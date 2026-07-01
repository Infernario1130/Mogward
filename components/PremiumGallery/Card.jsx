import React from 'react';

export function Card({ card, width, height, accentColor }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl pointer-events-none"
      style={{ width, height }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${card.image})` }}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        {card.subtitle && (
          <p
            className="mb-1 text-[10px] font-extrabold tracking-[0.2em] uppercase"
            style={{ color: accentColor }}
          >
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