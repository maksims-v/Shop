import { Box, IconButton, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import ProductCard from './ProductCard';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getNewArrivalsSliderData } from '@/state/newArrivalsSliderSlice';
import { useDispatch, useSelector } from 'react-redux';

const NewArrivalsSlider = () => {
  const data = useSelector((state) => state.fetchNewArrivalsData.data);
  const status = useSelector((state) => state.fetchNewArrivalsData.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewArrivalsSliderData());
  }, []);

  return (
    <Box width="100%" m="20px 0px 50px 0px" fontWeight="bold" fontSize="20px">
      <Link href="/newArrivals">
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          New Arrivals
        </Typography>{' '}
      </Link>
      <Carousel
        infiniteLoop={false}
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
        {status === 'resolved' && data?.map((item) => <ProductCard key={item.id} item={item} />)}
      </Carousel>
    </Box>
  );
};

export default NewArrivalsSlider;
