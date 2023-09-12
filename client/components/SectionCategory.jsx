import { useState, useEffect } from 'react';
import { Box, Typography, ImageListItem, ImageList } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Image from 'next/image';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1152: { items: 5 },
};

const SectionCategory = ({ sectionCategoryData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const data = sectionCategoryData?.map((item) => {
    return (
      <Box
        sx={{
          borderRadius: '50%',
          overflow: 'hidden',
          width: 200,
          height: 200,
          position: 'relative',
          p: '0px 1px',
        }}>
        <Link href={`/shop/${item.pageCategory}/${item.category}`}>
          <Box
            sx={{
              position: 'absolute',
              color: 'white',
              zIndex: 99,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
              fontSize: '24px',
              borderRadius: '50%',
            }}>
            {item.title}
          </Box>

          <ImageListItem key={item.img} sx={{ '&:hover': { scale: '1.3', transition: '1.5s' } }}>
            <img
              src={`${process.env.API_URL}${item.image?.data?.attributes?.url}?w=200&fit=crop&auto=format`}
              alt={item.title}
              style={{ height: '200px', width: '200px', objectFit: 'cover' }}
              loading="lazy"
            />
          </ImageListItem>
        </Link>
      </Box>
    );
  });

  return (
    <Box sx={{ mb: '50px' }}>
      {isClient && (
        <AliceCarousel
          animationDuration={800}
          disableDotsControls="true"
          disableButtonsControls="true"
          true
          infinite
          //  autoPlay
          autoPlayInterval={3000}
          items={data}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      )}
    </Box>
  );
};

export default SectionCategory;
