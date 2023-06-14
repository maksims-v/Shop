import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';

const HeadBanner = () => {
  const sliderData = useSelector((state) => state.sliders.mainSliderData);
  const mediumScreen = useMediaQuery('(min-width:900px)');
  const largeScreen = useMediaQuery('(min-width:1200px)');

  return (
    <Box
      justifyContent="center"
      mt={mediumScreen ? '80px' : '70px'}
      width="100%"
      display="flex"
      flexWrap="wrap"
      p={!largeScreen && '0px 10px'}>
      <Link href={`${sliderData[0]?.attributes?.gendre}/${sliderData[0]?.attributes?.cattegory}`}>
        <img
          width="100%"
          src={`http://localhost:1337${sliderData[0]?.attributes?.image?.data?.attributes?.url}`}
        />
      </Link>
    </Box>
  );
};

export default HeadBanner;
