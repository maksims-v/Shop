import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const SectionBanner = ({ bannerData }) => {
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  return (
    bannerData[0]?.attributes.isShow && (
      <Box sx={{ mb: mobile ? '0px' : '50px', width: '100%', position: 'relative' }}>
        <Link
          href={`shop/${bannerData[0]?.attributes?.pageCategory}/${bannerData[0]?.attributes?.category}/${bannerData[0]?.attributes?.subcategory}`}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '90%',
              m: '0 auto',
              textAlign: 'center',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
            }}>
            {bannerData[0]?.attributes?.title}
          </Typography>
          <Button
            size="large"
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'white',
                borderColor: '#0062cc',
                boxShadow: 'none',
              },
            }}>
            SHOP HERE
          </Button>
          <img
            alt="banner"
            style={{
              width: '100%',
              objectFit: 'cover',
              height: mobile ? '300px' : 'auto',
            }}
            src={`${process.env.API_URL}${bannerData[0]?.attributes?.image?.data?.attributes?.url}`}
          />
        </Link>
      </Box>
    )
  );
};

export default SectionBanner;
