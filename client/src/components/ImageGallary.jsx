// src/components/ImageGallery.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { galleryImages } from '../assets/assets';

export default function ImageGallery() {
  return (
    <div className="mt-20 font-[Poppins] px-4">
      <h1 className="text-3xl font-semibold text-center">Our Latest Creations</h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        A vibrant showcase of our freshest picks — handpicked essentials, farm-fresh produce, and pantry staples, all in one place.
      </p>

      <div className="flex items-center gap-3 h-[400px] w-full max-w-6xl mt-10 mx-auto overflow-x-auto scrollbar-hide">
        {galleryImages.map(({ img, label, path }, index) => (
          <Link
            to={path}
            key={index}
            className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
          >
            <img
              className="h-full w-full object-cover object-center"
              src={img}
              alt={label}
            />
            {/* Optional overlay text */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition">
              {label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
