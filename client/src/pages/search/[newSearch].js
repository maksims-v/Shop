import Filters from 'components/Filters';
import ProductList from 'components/ProductList';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters, inputValue } from '@/state/searchPageSlice';
import NewSearchMobileVesersion from 'components/mobileVersionPage/NewSearchMobileVesersion';
import SortingByPriceAndName from 'components/SortingByPriceAndName';

const Search = ({ newSearch, searchData }) => {
  const searchFlag = useSelector((state) => state.searchPageSlice.searchFlag);
  const total = useSelector((state) => state.searchPageSlice.metaData.total);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newSearch.length !== 0) {
      dispatch(clearAllFilters());
      dispatch(inputValue(newSearch));
    }
  }, [newSearch]);

  useEffect(() => {
    dispatch(search({ pageCategory: 'all' }));
  }, [searchFlag, newSearch]);

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(inputValue(newSearch));
    dispatch(search());
  };

  return mobile ? (
    <NewSearchMobileVesersion newSearch={newSearch} clearFilters={clearFilters} />
  ) : (
    <Box sx={{ mt: '50px' }}>
      <Box display="flex">
        <Box flex="1 1 10%">
          <Filters />
        </Box>
        <Box flex="1 1 80%">
          {!mobile && (
            <Box display="flex" justifyContent="space-between" mb="20px">
              <Typography variant="h3">
                Your search for
                <Typography
                  component="span"
                  sx={{ pl: '5px', fontSize: '22px', fontWeight: '600' }}>
                  {newSearch}
                </Typography>{' '}
                {total} results
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

export default Search;

export async function getServerSideProps({ query }) {
  const { newSearch } = query;

  return { props: { newSearch } };
}
