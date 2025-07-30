import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import MarqueeSlider from '../components/MarqueeSlider'
import ImageGallery from '../components/ImageGallary'
import HappyClient from '../components/HappyClient'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <MarqueeSlider />
  <div className="px-2 md:px-4 lg:px-6 xl:px-2">
        <BestSeller />
      </div>
       <div className='px-2 md:px-4'>
          <ImageGallery />
        </div>
      <BottomBanner />
      <NewsLetter />
      <HappyClient />
    </div>
  );
};


export default Home
