import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useEffect } from 'react';
import { getNewArrivalsSliderData } from '@/state/newArrivalsSliderSlice';
import { useDispatch, useSelector } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
  0: { items: 2 },
  600: { items: 3 },
  1152: { items: 4 },
};

const NewArrivalsSlider = () => {
  const data = useSelector((state) => state.fetchNewArrivalsData.data);
  const status = useSelector((state) => state.fetchNewArrivalsData.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewArrivalsSliderData());
  }, []);

  return (
    <Box width="100%">
      <Link href="/newArrivals">
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
          New Arrivals
        </Typography>{' '}
      </Link>
      {status === 'resolved' && (
        <AliceCarousel
          mouseTracking
          animationDuration={800}
          disableDotsControls="true"
          infinite
          autoPlay
          autoPlayInterval={2000}
          items={data?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      )}
    </Box>
  );
};
// {status === 'resolved' && data?.map((item) => <ProductCard key={item.id} item={item} />)}

export default NewArrivalsSlider;
