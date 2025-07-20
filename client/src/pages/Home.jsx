import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import MarqueeSlider from '../components/MarqueeSlider'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <MarqueeSlider />
  <div className="px-2 md:px-4 lg:px-6 xl:px-2">
        <BestSeller />
      </div>

      <BottomBanner />
      <NewsLetter />
    </div>
  );
};


export default Home
