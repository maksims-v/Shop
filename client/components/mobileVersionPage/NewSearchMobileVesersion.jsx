import { Box, Chip, Stack } from '@mui/material';
import ProductList from '../ProductList';
import MobileFilters from '../filtersComponents/MobileFilters';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Layout from 'components/layout/Layout';

const NewSearchMobileVesersion = ({ newSearch }) => {
  const genderChecked = useSelector((state) => state.search.genderChecked);
  const categoryChecked = useSelector((state) => state.search.categoryChecked);

  const dispatch = useDispatch();
  const [gender, setGender] = useState('');

  return (
    <Layout>
      <Box display="flex" alignContent="center" flexDirection="column">
        <Stack direction="row" spacing={0.2} sx={{ m: '0 auto', mb: '10px', color: 'black' }}>
          {genderChecked?.map((item) => (
            <Chip key={item} label={item} size="small" sx={{ m: '0px 1px' }} />
          ))}
          {categoryChecked?.map((item) => (
            <Chip key={item} label={item} size="small" sx={{ m: '0px 1px' }} />
          ))}
        </Stack>
        <MobileFilters newSearch={newSearch} gender={gender} />
        <ProductList />
      </Box>
    </Layout>
  );
};

export default NewSearchMobileVesersion;

export async function getServerSideProps({ query }) {
  const { newSearch } = query;

  return { props: { newSearch } };
}
