// components/WhatsappButton.jsx
import React from 'react';
import { assets } from '../assets/assets';

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/917384708532"  // Replace with your WhatsApp number
      className="fixed bottom-4 right-4 z-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={assets.wp_icon}
        alt="Chat on WhatsApp"
        className="w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-transform"
      />
    </a>
  );
};

export default WhatsappButton;