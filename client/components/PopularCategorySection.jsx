import useSWR from 'swr';
const qs = require('qs');

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PopularCategorySectionItem from './PopularCategorySectionItem';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const query = qs.stringify({
  populate: {
    popularCategeory: {
      populate: { image: true },
    },
  },
});

const PopularCategorySection = () => {
  const { data, isLoading, error } = useSWR(
    `${process.env.API_URL}/api/section-popular-categories?${query}`,
    fetcher,
  );

  console.log(data);

  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    data &&
    data.data.length !== 0 && (
      <Box m={mobile ? '0 auto' : '0 auto 60px auto'} width="100%" p={mobile ? '0px' : '0px 5px'}>
        {!mobile && (
          <Typography variant="h2" sx={{ textAlign: 'center', mb: ' 15px' }}>
            Popular Categories
          </Typography>
        )}
        <Box mb="20px" display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
          {data?.data[0]?.attributes?.popularCategeory?.map((item) => {
            return item.isShow && <PopularCategorySectionItem key={item.id} item={item} />;
          })}
        </Box>
      </Box>
    )
  );
};

export default PopularCategorySection;
