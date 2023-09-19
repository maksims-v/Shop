import { Box } from '@mui/material';
import ProductList from '../ProductList';
import MobileFilters from '../filtersComponents/MobileFilters';

const NewSearchMobileVesersion = ({ newSearch, clearFilters }) => {
  return (
    <Box sx={{ display: 'flex', alignContent: 'center', flexDirection: 'column', mt: '10px' }}>
      <MobileFilters newSearch={newSearch} clearFilters={clearFilters} />
      <ProductList />
    </Box>
  );
};

export default NewSearchMobileVesersion;
