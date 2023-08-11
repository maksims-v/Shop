import { useDispatch, useSelector } from 'react-redux';
import { getSectionBannerData } from '@/state/sectionBannerSlice';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

const SectionBanner = () => {
  const dispatch = useDispatch();

  const largeScreen = useMediaQuery('(min-width:1200px)');

  const category = useSelector((state) => state.fetchSectionBannerData.category);
  const subcategory = useSelector((state) => state.fetchSectionBannerData.subcategory);
  const image = useSelector((state) => state.fetchSectionBannerData.image);

  useEffect(() => {
    dispatch(getSectionBannerData());
  }, []);

  return (
    <Box>
      <Link href={subcategory ? `${category}/${subcategory}` : `${category}`}>
        <img alt="?" width="100%" src={`http://localhost:1337${image}`} />
      </Link>
    </Box>
  );
};

export default SectionBanner;
