import { useDispatch, useSelector } from 'react-redux';
import { getSectionBannerData } from '@/state/sectionBannerSlice';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';

const SectionBanner = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.fetchSectionBannerData.category);
  const subcategory = useSelector((state) => state.fetchSectionBannerData.subcategory);
  const image = useSelector((state) => state.fetchSectionBannerData.image);

  useEffect(() => {
    dispatch(getSectionBannerData());
  }, []);

  return (
    <Box justifyContent="center" width="100%" display="flex" flexWrap="wrap" maxHeight="630px">
      <Link href={subcategory ? `/${category}/${subcategory}` : `/${category}`}>
        <img style={{ maxHeight: '630px' }} src={`http://localhost:1337${image}`} />
      </Link>
    </Box>
  );
};

export default SectionBanner;
