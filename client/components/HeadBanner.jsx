import { Box } from '@mui/material';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';

const HeadBanner = () => {
  const largeScreen = useMediaQuery('(min-width:1200px)');

  const [bannerData, setBannerData] = useState(false);

  async function getBannerData() {
    const res = await fetch(`${process.env.API_URL}/api/head-banners?populate=*`);
    const data = await res.json();

    if (data) {
      setBannerData(data?.data[0]?.attributes);
    }
  }

  useEffect(() => {
    getBannerData();
  }, []);

  return (
    <Box
      justifyContent="center"
      width="100%"
      display="flex"
      flexWrap="wrap"
      p={!largeScreen && '0px 10px'}>
      <Link href={`${bannerData?.gendre}/${bannerData?.cattegory}`}>
        <img
          width="100%"
          src={`http://localhost:1337${bannerData?.image?.data?.attributes?.url}`}
        />
      </Link>
    </Box>
  );
};

export default HeadBanner;
