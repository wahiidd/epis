"use client";

import React from 'react';
import { playSound } from '../../../lib/services/sound';

export default function Button({
  variant = 'primary',
  children,
  onClick,
  disabled = false
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;

  return (
    <button
      className={`${baseClass} ${variantClass}`}
      onClick={(e) => {
        // play click sound on any button press
        playSound('click.mp3');
        if (typeof onClick === 'function') onClick(e);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
