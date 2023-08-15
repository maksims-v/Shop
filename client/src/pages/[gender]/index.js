import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters, setDiscounts, setSortValue } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import CategoryFilter from 'components/filtersComponents/CategoryFilter';
import SubCategoryFilter from 'components/filtersComponents/SubCategoryFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import Layout from 'components/layout/Layout';
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import Link from 'next/link';
import GenderMobileVersion from 'components/mobileVersionPage/GenderMobileVersion';

const PageCategory = ({ gender }) => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.search.searchFlag);
  const currentPage = useSelector((state) => state.search.currentPage);
  const sortValue = useSelector((state) => state.search.sortValue);
  const total = useSelector((state) => state.search.metaData.total);
  const mobile = useSelector((state) => state.search.mobile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  useEffect(() => {
    dispatch(clearAllFilters());
  }, [gender]);

  useEffect(() => {
    dispatch(search({ gender }));
  }, [searchFlag, gender]);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(search({ gender }));
  };

  return mobile ? (
    <GenderMobileVersion clearFilters={clearFilters} gender={gender} />
  ) : (
    <Layout>
      <Box mt="50px">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px' }}>
          <Link underline="hover" color="inherit" href="/">
            HOME
          </Link>
          <Link
            underline="hover"
            color="inherit"
            style={{ pointerEvents: 'none', fontWeight: 'bold' }}
            href={`/${gender}`}>
            {gender?.toUpperCase()}
          </Link>
        </Breadcrumbs>
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
            {!mobile && (
              <Box display="flex" justifyContent="space-between" mb="10px">
                <Typography variant="h1" sx={{ fontSize: '22px', fontWeight: '600' }}>
                  {gender?.toUpperCase()}
                  <Typography component="span" sx={{ pl: '5px', color: '#989c9b' }}>
                    ({total} products)
                  </Typography>
                </Typography>
                <SortingByPriceAndName />
              </Box>
            )}
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
