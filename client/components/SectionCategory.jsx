import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';

const responsive = {
  0: { items: 3 },
  568: { items: 3 },
  870: { items: 4 },

  1152: { items: 5 },
};

const SectionCategory = ({ sectionCategoryData }) => {
  const [isClient, setIsClient] = useState(false);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const data = sectionCategoryData?.map((item) => {
    return (
      <Box
        sx={{
          borderRadius: !mobile && '50%',
          overflow: 'hidden',
          width: mobile ? '99%' : 200,
          height: mobile ? '300px' : '200px',
          position: 'relative',
          p: '0 0.5px',
        }}>
        <Link href={`/shop/${item.pageCategory}/${item.category}`}>
          <Box
            sx={{
              position: 'absolute',
              color: 'white',
              zIndex: 99,
              top: mobile ? '90%' : '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
              fontSize: '24px',
              borderRadius: '50%',
            }}>
            {item.title}
          </Box>
          <Box key={item.img} sx={{ '&:hover': { scale: '1.3', transition: '1.5s' } }}>
            <img
              src={`${process.env.API_URL}${item.image?.data?.attributes?.url}`}
              alt={item.title}
              style={{ height: mobile ? '300px' : '200px', width: '200px', objectFit: 'cover' }}
              loading="lazy"
            />
          </Box>
        </Link>
      </Box>
    );
  });

  return (
    <Box sx={{ mb: !mobile && '50px' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: '20px' }}>
        {' '}
        Shop By Section
      </Typography>
      {isClient && (
        <AliceCarousel
          animationDuration={800}
          disableDotsControls="true"
          disableButtonsControls="true"
          infinite
          autoPlay
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
