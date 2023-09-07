import { Box } from '@mui/material';
import ProductList from 'components/ProductList';
import Filters from 'components/Filters';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters } from '@/state/searchPageSlice';
import SearchMobileVersion from 'components/mobileVersionPage/SearchMobileVersion';

const Index = () => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.searchPageSlice.searchFlag);
  const currentPage = useSelector((state) => state.searchPageSlice.currentPage);
  const sortValue = useSelector((state) => state.searchPageSlice.sortValue);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  useEffect(() => {
    dispatch(clearAllFilters());
  }, []);

  useEffect(() => {
    dispatch(search({ path: '/equipments' }));
  }, [searchFlag]);

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(search('/equipments'));
  };

  return mobile ? (
    <SearchMobileVersion clearFilters={clearFilters} />
  ) : (
    <Box mt="60px">
      <Box display="flex">
        <Box flex="1 1 10%">
          <Filters />
        </Box>
        <Box flex="1 1 80%">
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
