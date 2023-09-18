import { Box } from '@mui/material';
import Link from 'next/link';
import ProductCard from './ProductCard';

const SectionBrands = ({ sectionBrandData }) => {
  console.log(sectionBrandData?.data[0]?.attributes?.brandSection);

  const productsRender = sectionBrandData?.data[0]?.attributes?.brandSection?.products?.data?.map(
    (item) => {
      return <ProductCard key={item.id} item={item.attributes} section={'brandSection'} />;
    },
  );

  return (
    sectionBrandData?.data[0]?.attributes?.isShow && (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          height: '700px',
          pl: '0px',
          overflow: 'hidden',
        }}>
        <Box sx={{ p: '0px 0px 20px 0px', width: '50%' }}>
          <Link href={`search/${sectionBrandData?.data[0]?.attributes?.brandSection?.brand}`}>
            <img
              alt="banner"
              style={{ width: '100%', objectFit: 'cover', height: '700px' }}
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
            justifyContent: 'space-between',
            p: '0px 0px 0px 20px',
          }}>
          {productsRender}
        </Box>
      </Box>
    )
  );
};

export default SectionBrands;
