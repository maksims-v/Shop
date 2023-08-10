import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearFilters, setDiscounts } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import SubCategoryFilter from 'components/filtersComponents/SubCategoryFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import Link from 'next/link';
import Layout from 'components/layout/Layout';

const Category = ({ gender, category }) => {
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
    dispatch(search({ gender, category }));
  }, [searchFlag, gender, category]);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
  };

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
        </Breadcrumbs>

        <Box display="flex">
          <Box flex="1 1 10%">
            <PriceSlider />
            <SaleFilter handleChange={handleChange} />
            <SubCategoryFilter />
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

export default Category;

export async function getServerSideProps({ params }) {
  const { gender, category } = params;

  return { props: { gender, category } };
}
