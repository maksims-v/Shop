import { Box, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import Item from './Item';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const NewArrivalsSlider = () => {
  const [sliderData, setSliderData] = useState(false);

  async function getSliderData() {
    const res = await fetch(`${process.env.API_URL}/api/products?populate=*`);
    const data = await res.json();

    if (data) {
      setSliderData(data?.data);
    }
  }

  useEffect(() => {
    getSliderData();
  }, []);

  return (
    <Box width="100%" m="20px 0px 50px 0px" fontWeight="bold" fontSize="20px">
      <Link href="/newArrivals">
        <Box component="span">New Arrivals</Box>{' '}
      </Link>
      <Carousel
        infiniteLoop={true}
        autoPlay={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        centerMode
        centerSlidePercentage={24}
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
        {sliderData && sliderData.map((item) => <Item key={item.id} item={item} />)}
      </Carousel>
    </Box>
  );
};

export default NewArrivalsSlider;
