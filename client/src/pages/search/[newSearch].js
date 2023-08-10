import Filters from 'components/Filters';
import ProductList from 'components/ProductList';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearFilters, inputValue } from '@/state/searchPageSlice';
import MobileFiltersPage from 'components/MobileFiltersPage';
import Layout from 'components/layout/Layout';

const Search = ({ newSearch }) => {
  const searchFlag = useSelector((state) => state.search.searchFlag);
  const total = useSelector((state) => state.search.metaData.total);
  const mobile = useSelector((state) => state.search.mobile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newSearch.length !== 0) {
      dispatch(clearFilters());
      dispatch(inputValue(newSearch));
    }
  }, [newSearch]);

  useEffect(() => {
    dispatch(search());
  }, [searchFlag, newSearch]);

  return !mobile ? (
    <Layout>
      <Box sx={{ mt: '60px' }}>
        <Box display="flex" alignContent="center" flexDirection="column">
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: 'bold',
              margin: '0 auto 17px auto',
            }}>
            Your search for as produced {total} results
          </Typography>
        </Box>
        <Box display="flex">
          <Box flex="1 1 10%">
            <Filters />
          </Box>
          <Box flex="1 1 80%">
            <ProductList />
          </Box>
        </Box>
      </Box>
    </Layout>
  ) : (
    <MobileFiltersPage />
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const { newSearch } = query;

  return { props: { newSearch } };
}
