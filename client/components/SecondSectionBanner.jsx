import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

const SecondSectionBanner = ({ secondBannerData }) => {
  const largeScreen = useMediaQuery('(min-width:1200px)');

  return secondBannerData.map((item) => {
    return (
      item.attributes?.isShow && (
        <Box
          key={item.id}
          sx={{
            mb: '50px',
            maxHeight: '450px',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}>
          <Link
            href={`shop/${item?.attributes?.pageCategory}/${item?.attributes?.category}/${item?.attributes?.subcategory}`}>
            <Box
              sx={{
                width: 'auto',
                position: 'absolute',
                left: `${item?.attributes?.textPositionLeft}%`,
                top: `${item?.attributes?.textTopPosition}%`,
                color: item?.attributes?.textColor,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <Typography variant="h2" sx={{ fontSize: largeScreen ? '36px' : '6vw' }}>
                {item?.attributes?.title}
              </Typography>
              <Typography variant="h3" sx={{ fontSize: largeScreen ? '26px' : '4vw' }}>
                {item?.attributes?.subtitle}
              </Typography>
            </Box>

            <img
              alt="banner"
              style={{ height: '450px', objectFit: 'cover', width: '100%' }}
              src={`${process.env.API_URL}${item?.attributes?.image?.data?.attributes?.url}`}
            />
          </Link>
        </Box>
      )
    );
  });
};

export default SecondSectionBanner;
