import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const SectionBrands = ({ sectionBrandData }) => {
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const productsRender = sectionBrandData?.data[0]?.attributes?.brandSection?.products?.data?.map(
    (item) => {
      return <ProductCard key={item.id} item={item.attributes} section={'brandSection'} />;
    },
  );

  return (
    sectionBrandData?.data[0]?.attributes?.isShow &&
    !mobile && (
      <Box mb="60px">
        <Typography variant="h2" sx={{ textAlign: 'center', mb: '15px' }}>
          {sectionBrandData?.data[0]?.attributes?.brandSection.title}{' '}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            height: '720px',
            p: '10px 0px',
            overflow: 'hidden',
          }}>
          <Box sx={{ p: '0px 0px 20px 0px', width: '50%' }}>
            <Link href={`search/${sectionBrandData?.data[0]?.attributes?.brandSection?.brand}`}>
              <img
                alt="banner"
                style={{ width: '100%', objectFit: 'cover', height: '720px' }}
                src={`${process.env.API_URL}${sectionBrandData?.data[0]?.attributes?.brandSection.image?.data?.attributes?.url}`}
              />
            </Link>
          </Box>
          <Box
            sx={{
              height: '700px',
              display: 'flex',
              flexWrap: 'wrap',
              width: '50%',
              justifyContent: 'space-around',
              p: '0px 0px 0px 20px',
            }}>
            {productsRender}
          </Box>
        </Box>
      </Box>
    )
  );
};

export default SectionBrands;
