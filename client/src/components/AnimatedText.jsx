import React from 'react';

const AnimatedText = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`inline-block whitespace-nowrap ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{ animationDelay: `${index * 0.05}s` }}
          className={`inline-block opacity-0 ${
            direction === 'left' ? 'animate-slideInLeft' : 'animate-slideInRight'
          }`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;