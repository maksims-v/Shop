import { Box } from '@mui/material';

import PageCategoryFilter from './filtersComponents/PageCategoryFilter';
import SaleFilter from './filtersComponents/SaleFilter';
import CategoryFilter from './filtersComponents/CategoryFilter';
import SubCategoryFilter from './filtersComponents/SubCategoryFilter';
import BrandFilter from './filtersComponents/BrandFilter';
import PriceSlider from './filtersComponents/PriceSlider';
import SizesFilter from './filtersComponents/SizesFilter';

const Filters = () => {
  return (
    <Box maxWidth="195px">
      <PageCategoryFilter />
      <PriceSlider />
      <SaleFilter />
      <CategoryFilter />
      <SubCategoryFilter />
      <BrandFilter />
      <SizesFilter />
    </Box>
  );
};

export default Filters;
