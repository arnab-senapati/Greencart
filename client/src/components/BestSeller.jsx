import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();
  const scrollRef = useRef(null);
  const directionRef = useRef(1);

  const bestSellers = products
    .filter((product) => product.inStock)
    .slice(0, 15);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 1;

    const interval = setInterval(() => {
      container.scrollLeft += scrollAmount * directionRef.current;

      if (
        container.scrollLeft + container.clientWidth >= container.scrollWidth ||
        container.scrollLeft <= 0
      ) {
        directionRef.current *= -1;
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 w-screen overflow-hidden p-0 m-0">
      <div className="px-0">
        <p className="text-2xl md:text-3xl font-medium mb-4">Top Picks</p>
      </div>

{/* Scroll container */}
<div
  ref={scrollRef}
  className="overflow-x-scroll scroll-smooth no-scrollbar"
  style={{
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    marginLeft: '-1px',  // <-- ✅ Force it left
    paddingLeft: '16px',  // <-- ✅ Keep layout clean
  }}
>

        <div
          className="flex w-max"
          style={{
            marginLeft: '0px',
            paddingLeft: '0px',
          }}
        >
          {bestSellers.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px]"
              style={{
                marginLeft: index === 0 ? '0px' : '8px',
                marginRight: index === bestSellers.length - 1 ? '0px' : '8px',
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;