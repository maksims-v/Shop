import useSWR from 'swr';
const qs = require('qs');

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const responsive = {
  0: { items: 2 },
  500: { items: 3 },
  1152: { items: 4 },
};

const query = qs.stringify({
  filters: {
    new: true,
  },
  populate: { image: true },
  pagination: {
    limit: 20,
  },
});

const NewArrivalsSlider = () => {
  const [isClient, setIsClient] = useState(false);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const { data, isLoading, error } = useSWR(
    `${process.env.API_URL}/api/products?${query}`,
    fetcher,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const carouselItems = data
    ? data?.data?.map((item) => <ProductCard key={item.id} item={item.attributes} />)
    : [];

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
          items={carouselItems}
          responsive={responsive}
        />
      )}
    </Box>
  );
};

export default NewArrivalsSlider;
