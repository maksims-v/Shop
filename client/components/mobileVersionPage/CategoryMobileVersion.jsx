import { Box, Breadcrumbs } from '@mui/material';
import ProductList from 'components/ProductList';
import Link from 'next/link';
import Layout from 'components/layout/Layout';
import MobileFilters from 'components/filtersComponents/MobileFilters';
import MobileSearchChip from 'components/filtersComponents/MobileSearchChip';

const CategoryMobileVersion = ({ gender, category, clearFilters }) => {
  return (
    <Layout>
      <Box mt="0px">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '5px', pl: '20px' }}>
          <Link underline="hover" color="inherit" href="/">
            HOME
          </Link>
          <Link underline="hover" color="inherit" href={`/${gender}`}>
            {gender?.toUpperCase()}
          </Link>
          <Link
            style={{ fontWeight: 'bold' }}
            underline="hover"
            color="inherit"
            href={`/${gender}/${category}`}>
            {category?.toUpperCase()}
          </Link>
        </Breadcrumbs>

        <Box display="flex" alignContent="center" flexDirection="column">
          <MobileSearchChip />
          <MobileFilters clearFilters={clearFilters} />
          <ProductList />
        </Box>
      </Box>
    </Layout>
  );
};

export default CategoryMobileVersion;
