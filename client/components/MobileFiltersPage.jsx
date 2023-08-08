import { Box, Chip, Stack } from '@mui/material';
import ProductList from './ProductList';
import MobileFilters from './filtersComponents/MobileFilters';
import { useDispatch, useSelector } from 'react-redux';
import { setGenderChecked } from '@/state/searchPageSlice';
import { useState } from 'react';

const MobileFiltersPage = ({ newSearch }) => {
  const genderChecked = useSelector((state) => state.search.genderChecked);
  const dispatch = useDispatch();
  const [gender, setGender] = useState('');

  return (
    <>
      <Box>
        <Box display="flex" alignContent="center" flexDirection="column">
          <Stack direction="row" spacing={0.2} sx={{ m: '0 auto', mb: '5px', color: 'black' }}>
            {genderChecked?.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => setGender(item)} />
            ))}
          </Stack>
          <MobileFilters newSearch={newSearch} gender={gender} />
          <ProductList />
        </Box>
      </Box>
    </>
  );
};

export default MobileFiltersPage;

export async function getServerSideProps({ query }) {
  const { newSearch } = query;

  return { props: { newSearch } };
}
