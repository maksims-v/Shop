import { Box } from '@mui/material';
import ProductList from '../ProductList';
import MobileFilters from '../filtersComponents/MobileFilters';

const SearchMobileVersion = ({ clearFilters }) => {
  return (
    <Box sx={{ display: 'flex', alignContent: 'center', flexDirection: 'column', mt: '10px' }}>
      <MobileFilters clearFilters={clearFilters} />
      <ProductList />
    </Box>
  );
};

export default SearchMobileVersion;
