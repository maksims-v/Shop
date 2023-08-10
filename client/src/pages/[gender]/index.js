import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearFilters, setDiscounts, setSortValue } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import CategoryFilter from 'components/filtersComponents/CategoryFilter';
import SubCategoryFilter from 'components/filtersComponents/SubCategoryFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import Layout from 'components/layout/Layout';

const PageCategory = ({ gender }) => {
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
    dispatch(search({ gender }));
  }, [searchFlag, gender]);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
  };

  return (
    <Layout>
      <Box mt="60px">
        <Box display="flex">
          <Box flex="1 1 10%">
            <PriceSlider />
            <SaleFilter handleChange={handleChange} />
            <CategoryFilter />
            <SubCategoryFilter />
            <BrandFilter />
            <SizesFilter />
          </Box>
          <Box flex="1 1 80%">
            <ProductList gender={gender} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default PageCategory;

export async function getServerSideProps({ params }) {
  const { gender } = params;

  return { props: { gender } };
}
