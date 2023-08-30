import { Box } from '@mui/material';
import ProductList from '../ProductList';
import MobileFilters from '../filtersComponents/MobileFilters';
import Layout from 'components/Layout';
import MobileSearchChip from 'components/filtersComponents/MobileSearchChip';

const SearchMobileVersion = ({ clearFilters }) => {
  return (
    <Box display="flex" alignContent="center" flexDirection="column">
      <MobileSearchChip />
      <MobileFilters clearFilters={clearFilters} />
      <ProductList />
    </Box>
  );
};

export default SearchMobileVersion;
