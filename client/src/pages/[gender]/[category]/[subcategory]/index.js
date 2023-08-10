import { Box, Breadcrumbs } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearFilters } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import Link from 'next/link';
import Layout from 'components/layout/Layout';

const SubCategory = ({ gender, category, subcategory }) => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.search.searchFlag);
  const currentPage = useSelector((state) => state.search.currentPage);
  const sortValue = useSelector((state) => state.search.sortValue);
  const total = useSelector((state) => state.search.metaData.total);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  useEffect(() => {
    dispatch(clearFilters());
  }, [gender]);

  useEffect(() => {
    dispatch(search({ gender, category, subcategory }));
  }, [searchFlag, gender, category, subcategory]);
  return (
    <Layout>
      <Box mt="10px">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px' }}>
          <Link underline="hover" color="inherit" href="/">
            HOME
          </Link>
          <Link underline="hover" color="inherit" href={`/${gender}`}>
            {gender?.toUpperCase()}
          </Link>
          <Link underline="hover" color="inherit" href={`/${gender}/${category}`}>
            {gender?.toUpperCase()}
          </Link>
        </Breadcrumbs>

        <Box display="flex">
          <Box flex="1 1 10%">
            <PriceSlider />
            <SaleFilter />
            <BrandFilter />
            <SizesFilter />
          </Box>
          <Box flex="1 1 80%">
            <ProductList gender={gender} category={category} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default SubCategory;

export async function getServerSideProps({ params }) {
  const { gender, category, subcategory } = params;

  return { props: { gender, category, subcategory } };
}
