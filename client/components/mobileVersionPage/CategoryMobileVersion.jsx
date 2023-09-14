import { Box, Breadcrumbs } from '@mui/material';
import ProductList from 'components/ProductList';
import Link from 'next/link';
import MobileFilters from 'components/filtersComponents/MobileFilters';
import MobileSearchChip from 'components/filtersComponents/MobileSearchChip';

const CategoryMobileVersion = ({ pageCategory, category, clearFilters }) => {
  console.log('hai');
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '10px', mt: '20px', pl: '5px' }}>
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/shop/${pageCategory}`}>
          {pageCategory?.toUpperCase()}
        </Link>
        <Link
          style={{ fontWeight: 'bold' }}
          color="inherit"
          href={`/shop/${pageCategory}/${category}`}>
          {category?.toUpperCase()}
        </Link>
      </Breadcrumbs>

      <Box display="flex" alignContent="center" flexDirection="column">
        <MobileSearchChip />
        <MobileFilters clearFilters={clearFilters} />
        <ProductList />
      </Box>
    </Box>
  );
};

export default CategoryMobileVersion;
