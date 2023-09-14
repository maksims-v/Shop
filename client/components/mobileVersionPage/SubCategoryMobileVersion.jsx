import { Box, Breadcrumbs } from '@mui/material';
import ProductList from 'components/ProductList';
import Link from 'next/link';
import Layout from 'components/Layout';
import MobileFilters from 'components/filtersComponents/MobileFilters';
import MobileSearchChip from 'components/filtersComponents/MobileSearchChip';

const SubCategoryMobileVersion = ({ pageCategory, category, subcategory, clearFilters }) => {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '10px', mt: '20px', pl: '5px' }}>
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/shop/${pageCategory}`}>
          {pageCategory?.toUpperCase()}
        </Link>
        <Link underline="hover" color="inherit" href={`/shop/${pageCategory}/${category}`}>
          {category?.toUpperCase()}
        </Link>
        <Link
          underline="hover"
          style={{ fontWeight: 'bold' }}
          color="inherit"
          href={`/shop/${pageCategory}/${category}/${subcategory}`}>
          {subcategory.toUpperCase()}
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

export default SubCategoryMobileVersion;
