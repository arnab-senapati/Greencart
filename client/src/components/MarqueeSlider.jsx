import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const MarqueeSlider = () => {
  const { products } = useAppContext();

  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 15);

  return (
    <>
      <style>{`
        .marquee {
          overflow: hidden;
          position: relative;
          width: 100vw;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-right 60s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>

      <div className="mt-16 marquee relative">
        {/* Premium Section Title */}
        <div className="flex items-center gap-3 px-4 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary-dull rounded" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Best Seller Picks
          </h2>
        </div>

        {/* Gradient Edge Left */}
        {/* <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" /> */}

        {/* Gradient Edge Right */}
        <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Marquee Content */}
        <div className="marquee-track px-4 pb-4">
          {[...bestSellers, ...bestSellers].map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] mx-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarqueeSlider;