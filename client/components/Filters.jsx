import GenderFilter from './filtersComponents/GenderFilter';
import SaleFilter from './filtersComponents/SaleFilter';
import CategoryFilter from './filtersComponents/CategoryFilter';
import SubCategoryFilter from './filtersComponents/SubCategoryFilter';
import BrandFilter from './filtersComponents/BrandFilter';
import PriceSlider from './filtersComponents/PriceSlider';
import SizesFilter from './filtersComponents/SizesFilter';

import { Box, Divider } from '@mui/material';

const Filters = () => {
  return (
    <Box maxWidth="195px">
      <GenderFilter />
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
