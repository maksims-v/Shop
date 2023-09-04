import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
  0: { items: 2 },
  600: { items: 3 },
  1152: { items: 4 },
};

const NewArrivalsSlider = ({ newProductsData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = newProductsData?.map((item) => <ProductCard key={item.id} item={item} />);

  return (
    <Box width="100%">
      <Link href="/newArrivals">
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
          New Arrivals
        </Typography>{' '}
      </Link>
      {isClient && (
        <AliceCarousel
          animationDuration={800}
          disableDotsControls="true"
          infinite
          // autoPlay
          autoPlayInterval={2000}
          items={data}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      )}
    </Box>
  );
};

export default NewArrivalsSlider;
