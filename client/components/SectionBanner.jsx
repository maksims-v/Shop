import { Box } from '@mui/material';
import Link from 'next/link';

const SectionBanner = ({ bannerData }) => {
  return (
    bannerData.length !== 0 && (
      <Box sx={{ mb: '50px' }}>
        <Link
          href={`${bannerData[0]?.attributes?.gender}/${bannerData[0]?.attributes?.category}/${bannerData[0]?.attributes?.subcategory}`}>
          <img
            alt="banner"
            width="100%"
            src={`${process.env.API_URL}${bannerData[0]?.attributes?.image?.data?.attributes?.url}`}
          />
        </Link>
      </Box>
    )
  );
};

export default SectionBanner;
