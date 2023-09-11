const qs = require('qs');

import Filters from 'components/Filters';
import ProductList from 'components/ProductList';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters, inputValue } from '@/state/searchPageSlice';
import NewSearchMobileVesersion from 'components/mobileVersionPage/NewSearchMobileVesersion';

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
    dispatch(search({ page: 'newSearch' }));
  }, [searchFlag, newSearch]);

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(inputValue(newSearch));
    dispatch(search());
  };

  return mobile ? (
    <NewSearchMobileVesersion newSearch={newSearch} clearFilters={clearFilters} />
  ) : (
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
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const { newSearch } = query;

  const productQuery = qs.stringify(
    {
      filters: {
        title: { $startsWith: newSearch },
      },
      populate: {
        image: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const equpmentsQuery = qs.stringify(
    {
      filters: {
        title: { $startsWith: newSearch },
      },
      populate: {
        image: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const productResponse = await fetch(`${process.env.API_URL}/api/products?${productQuery}`);
  const equipmentsResponse = await fetch(`${process.env.API_URL}/api/equipments?${equpmentsQuery}`);

  let productResponseJson = [];
  let equipmentsResponseJson = [];

  productResponseJson = await productResponse.json();
  equipmentsResponseJson = await equipmentsResponse.json();

  const itemsArr = [...productResponseJson.data, ...equipmentsResponseJson.data];

  return { props: { newSearch, searchData: itemsArr } };
}
