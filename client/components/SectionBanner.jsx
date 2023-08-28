import { useDispatch, useSelector } from 'react-redux';
import { getSectionBannerData } from '@/state/sectionBannerSlice';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

const SectionBanner = () => {
  const dispatch = useDispatch();

  const largeScreen = useMediaQuery('(min-width:1200px)');

  const category = useSelector((state) => state.sectionBannerSlice.category);
  const subcategory = useSelector((state) => state.sectionBannerSlice.subcategory);
  const image = useSelector((state) => state.sectionBannerSlice.image);

  useEffect(() => {
    dispatch(getSectionBannerData());
  }, []);

  return (
    <Box sx={{ mb: '50px' }}>
      <Link href={subcategory ? `${category}/${subcategory}` : `${category}`}>
        <img alt="banner" width="100%" src={`http://localhost:1337${image}`} />
      </Link>
    </Box>
  );
};

export default SectionBanner;
