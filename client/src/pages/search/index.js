import { Box, Typography } from '@mui/material';
import ProductList from 'components/ProductList';
import Filters from 'components/Filters';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters } from '@/state/searchPageSlice';
import SearchMobileVersion from 'components/mobileVersionPage/SearchMobileVersion';
import Link from 'next/link';
import SortingByPriceAndName from 'components/SortingByPriceAndName';

const Index = () => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.searchPageSlice.searchFlag);
  const currentPage = useSelector((state) => state.searchPageSlice.currentPage);
  const sortValue = useSelector((state) => state.searchPageSlice.sortValue);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);
  const total = useSelector((state) => state.searchPageSlice.metaData.total);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  useEffect(() => {
    dispatch(clearAllFilters());
  }, []);

  useEffect(() => {
    dispatch(search({ pageCategory: 'all' }));
  }, [searchFlag]);

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(search());
  };

  return mobile ? (
    <SearchMobileVersion clearFilters={clearFilters} />
  ) : (
    <Box mt="50px">
      <Box display="flex">
        <Box flex="1 1 10%">
          <Filters />
        </Box>
        <Box flex="1 1 80%">
          {!mobile && (
            <Box display="flex" justifyContent="space-between" mb="20px">
              <Typography variant="h3">
                <Typography
                  component="span"
                  sx={{ pl: '5px', fontSize: '22px', fontWeight: '600' }}>
                  {total}
                </Typography>{' '}
                Products
              </Typography>
              <SortingByPriceAndName />
            </Box>
          )}
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
