import { Box, Chip, Stack } from '@mui/material';
import ProductList from '../ProductList';
import MobileFilters from '../filtersComponents/MobileFilters';
import { useDispatch, useSelector } from 'react-redux';
import { setGenderChecked } from '@/state/searchPageSlice';
import { useState } from 'react';
import Layout from 'components/layout/Layout';

const SearchMobileVersion = () => {
  const genderChecked = useSelector((state) => state.search.genderChecked);
  const categoryChecked = useSelector((state) => state.search.categoryChecked);
  const subCategoryChecked = useSelector((state) => state.search.subCategoryChecked);

  const dispatch = useDispatch();
  const [gender, setGender] = useState('');

  return (
    <Layout>
      <Box display="flex" alignContent="center" flexDirection="column">
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={0.2}
          sx={{ m: '0 auto', mb: '10px', color: 'black' }}>
          {genderChecked?.map((item) => (
            <Chip key={item} label={item} size="small" sx={{ m: '0px 2px 2px 2px' }} />
          ))}
          {categoryChecked?.map((item) => (
            <Chip key={item} label={item} size="small" sx={{ m: '0px 2px 2px 2px' }} />
          ))}
          {subCategoryChecked?.map((item) => (
            <Chip key={item} label={item} size="small" sx={{ m: '0px 2px 2px 2px' }} />
          ))}
        </Stack>
        <MobileFilters />
        <ProductList />
      </Box>
    </Layout>
  );
};

export default SearchMobileVersion;
