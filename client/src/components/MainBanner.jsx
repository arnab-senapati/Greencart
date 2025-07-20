import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/*
        Ensure the image covers the full width.
        'w-full' makes it 100% width of its parent.
        'h-auto' ensures height adjusts proportionally.
        'object-cover' ensures the image covers the area, potentially cropping,
                      which is usually desired for banners to avoid empty spaces.
      */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full h-auto hidden md:block object-cover"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full h-auto md:hidden object-cover"
      />

      {/* Centered content container */}
      {/*
        For the content overlay, we need to ensure it's positioned correctly.
        'inset-0' makes it span the entire parent (the div containing the image).
        The padding and max-width for content ensures it remains readable.
      */}
      <div className="absolute inset-0 flex justify-center items-end md:items-center">
        {/*
          This inner div now acts as your content wrapper.
          'w-full' ensures it takes full width of its parent (absolute inset-0 div).
          'max-w-screen-xl mx-auto' keeps your content centered and within a readable width.
          The horizontal padding (px-4 md:px-6 lg:px-12) will define the space from the sides of the browser.
          The 'pb-6' is for padding at the bottom for mobile/small screens.
        */}
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-12 pb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left text-[#1e1e1e] leading-tight lg:leading-[60px] max-w-[700px]">
            Freshness You Can Trust, Savings You Will Love!
          </h1>

          <div className="flex items-center gap-4 mt-6 font-medium justify-center md:justify-start">
            <Link
              to="/products"
              className="group flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
            >
              Shop now
              <img
                className="md:hidden transition group-focus:translate-x-1"
                src={assets.white_arrow_icon}
                alt="arrow"
              />
            </Link>

            <Link
              to="/products"
              className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer text-primary hover:underline"
            >
              Explore deals
              <img
                className="transition group-hover:translate-x-1"
                src={assets.black_arrow_icon}
                alt="arrow"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;