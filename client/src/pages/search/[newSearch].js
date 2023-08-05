import Filters from 'components/Filters';
import ProductList from 'components/ProductList';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  search,
  clearFilters,
  setDataFromServerSideRenderingNewSearchPage,
} from '@/state/searchPageSlice';
import MobileFiltersPage from 'components/MobileFiltersPage';

import { usePathname } from 'next/navigation';

const Search = ({ data }) => {
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const searchFlag = useSelector((state) => state.search.searchFlag);
  const total = useSelector((state) => state.search.metaData.total);
  const mobile = useSelector((state) => state.search.mobile);

  // useEffect(() => {
  //   dispatch(clearFilters());
  // }, [inputSearchValue]);

  useEffect(() => {
    dispatch(setDataFromServerSideRenderingNewSearchPage(data));
  }, []);
  console.log(data);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (inputSearchValue.length !== 0) {
  //     dispatch(search());
  //   }
  // }, [searchFlag, inputSearchValue]);

  return !mobile ? (
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
  ) : (
    <MobileFiltersPage />
  );
};

export default Search;

export async function getServerSideProps({ params }) {
  const { newSearch } = params;

  const res = await fetch(`${process.env.API_URL}/api/products/search/${newSearch}`);
  const data = await res.json();

  return { props: { data } };
}
