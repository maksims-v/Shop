import { Box } from '@mui/material';
import MainCarousel from 'components/MainCarosel';
import { useEffect } from 'react';
import { getSliderData } from '@/http/itemAPI';
import { useDispatch, useSelector } from 'react-redux';
import { sliderData } from '@/state/sliderSlice';
import Item from 'components/Item';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const dispatch = useDispatch();

  async function getItems() {
    const items = await fetch('http://localhost:1337/api/sliders?populate=*', {
      method: 'GET',
    });
    const itemsJson = await items.json();
    dispatch(sliderData(itemsJson?.data));
  }

  const sliderImage = useSelector((state) => state.slider.items);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box mb="300px">
      <MainCarousel sliderImage={sliderImage} />

      <Link href="/newArrivals">
        <Box m="50px 0px 50px 0px" fontWeight="bold" fontSize="20px">
          {' '}
          New Arrivals
        </Box>
      </Link>
      <Box width="100%" height="300px" m="0 auto">
        <Carousel
          infiniteLoop={true}
          autoPlay={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          centerMode
          centerSlidePercentage={22}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Carousel>
      </Box>
      {/* <Box display="flex" justifyContent="space-around">
        <Item />
        <Item />
        <Item />
        <Item />
      </Box> */}
    </Box>
  );
};

export default Home;
