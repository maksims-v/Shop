import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';

const responsive = {
  0: { items: 2 },
  500: { items: 3 },
  1152: { items: 4 },
};

const NewArrivalsSlider = ({ newProductsData }) => {
  const [isClient, setIsClient] = useState(false);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = newProductsData?.map((item) => <ProductCard key={item.id} item={item} />);

  return (
    <Box width="100%" mb={mobile ? '20px' : '60px'}>
      <Link href="/newArrivals">
        <Typography variant="h2" sx={{ textAlign: 'center', mb: '15px' }}>
          New Arrivals
        </Typography>{' '}
      </Link>
      {isClient && (
        <AliceCarousel
          animationDuration={800}
          disableDotsControls="true"
          disableButtonsControls={mobile && 'true'}
          infinite
          autoPlay
          autoPlayInterval={3000}
          items={data}
          responsive={responsive}
        />
      )}
    </Box>
  );
};

export default NewArrivalsSlider;
