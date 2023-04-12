import { Box, IconButton } from '@mui/material';
import MainCarousel from 'components/MainCarosel';
import { useEffect } from 'react';
import { getSliderData } from '@/http/itemAPI';
import { useDispatch, useSelector } from 'react-redux';
import { sliderData } from '@/state/sliderSlice';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import Item from 'components/Item';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
      <Box width="100%">
        {' '}
        <Carousel
          infiniteLoop={true}
          autoPlay={false}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          centerMode
          centerSlidePercentage={20}
          renderArrowPrev={(onClickHandler, hasPrev, label) => (
            <IconButton
              onClick={onClickHandler}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '0px',
                color: 'red',
                padding: '5px',
                zIndex: '10',
              }}>
              <NavigateBeforeIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
          renderArrowNext={(onClickHandler, hasNext, label) => (
            <IconButton
              onClick={onClickHandler}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '0px',
                color: 'red',
                padding: '5px',
                zIndex: '10',
              }}>
              <NavigateNextIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}>
          <Item sale={true} newItem={true} />
          <Item sale={false} newItem={true} />
          <Item sale={false} newItem={true} />
          <Item sale={true} newItem={false} />
          <Item sale={false} newItem={false} />
          <Item sale={false} newItem={true} />
        </Carousel>
      </Box>
    </Box>
  );
};

export default Home;
