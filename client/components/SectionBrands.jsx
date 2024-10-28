import useSWR from 'swr';
const qs = require('qs');

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const query = qs.stringify({
  populate: {
    brandSection: {
      populate: { image: true, products: { populate: { image: true } } },
    },
  },
});

const SectionBrands = () => {
  const { data, isLoading, error } = useSWR(
    `${process.env.API_URL}/api/section-brands?${query}`,
    fetcher,
  );

  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const productsRender = data?.data[0]?.attributes?.brandSection?.products?.data?.map((item) => {
    return <ProductCard key={item.id} item={item.attributes} section={'brandSection'} />;
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    data &&
    data.data.length !== 0 &&
    data?.data[0]?.attributes?.isShow &&
    !mobile && (
      <Box mb="60px">
        <Typography variant="h2" sx={{ textAlign: 'center', mb: '15px' }}>
          {data?.data[0]?.attributes?.brandSection.title}{' '}
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
            <Link href={`search/${data?.data[0]?.attributes?.brandSection?.brand}`}>
              <img
                alt="banner"
                style={{ width: '100%', objectFit: 'cover', height: '720px' }}
                src={`${process.env.API_URL}${data?.data[0]?.attributes?.brandSection.image?.data?.attributes?.url}`}
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
