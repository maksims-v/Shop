import { Box, Breadcrumbs } from '@mui/material';
import ProductList from 'components/ProductList';
import Link from 'next/link';
import Layout from 'components/Layout';
import MobileFilters from 'components/filtersComponents/MobileFilters';
import MobileSearchChip from 'components/filtersComponents/MobileSearchChip';

const SubCategoryMobileVersion = ({ gender, category, subcategory, clearFilters }) => {
  return (
    <Box mt="0px">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '5px', pl: '20px' }}>
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/${gender}`}>
          {gender?.toUpperCase()}
        </Link>
        <Link underline="hover" color="inherit" href={`/${gender}/${category}`}>
          {category?.toUpperCase()}
        </Link>
        <Link
          underline="hover"
          style={{ fontWeight: 'bold' }}
          color="inherit"
          href={`/${gender}/${category}/${subcategory}`}>
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
