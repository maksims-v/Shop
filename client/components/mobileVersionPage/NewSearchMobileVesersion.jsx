import { Box } from '@mui/material';
import ProductList from '../ProductList';
import MobileFilters from '../filtersComponents/MobileFilters';
import Layout from 'components/Layout';
import MobileSearchChip from 'components/filtersComponents/MobileSearchChip';

const NewSearchMobileVesersion = ({ newSearch, clearFilters }) => {
  return (
    <Layout>
      <Box display="flex" alignContent="center" flexDirection="column">
        <MobileSearchChip />
        <MobileFilters newSearch={newSearch} clearFilters={clearFilters} />
        <ProductList />
      </Box>
    </Layout>
  );
};

export default NewSearchMobileVesersion;
