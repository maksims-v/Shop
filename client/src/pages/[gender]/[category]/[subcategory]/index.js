import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearFilters } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import Link from 'next/link';
import Layout from 'components/layout/Layout';
import SubCategoryMobileVersion from 'components/mobileVersionPage/SubCategoryMobileVersion';

const SubCategory = ({ gender, category, subcategory }) => {
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
    dispatch(clearFilters());
  }, [gender]);

  useEffect(() => {
    dispatch(search({ gender, category, subcategory }));
  }, [searchFlag, gender, category, subcategory]);
  return mobile ? (
    <SubCategoryMobileVersion gender={gender} category={category} subcategory={subcategory} />
  ) : (
    <Layout>
      <Box mt="50px">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px' }}>
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
            style={{ pointerEvents: 'none', fontWeight: 'bold' }}
            color="inherit"
            href={`/${gender}/${category}/${subcategory}`}>
            {subcategory.toUpperCase()}
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
            {!mobile && (
              <Box display="flex" justifyContent="space-between" mb="10px">
                <Typography variant="h1" sx={{ fontSize: '22px', fontWeight: '600' }}>
                  {gender?.toUpperCase()} {subcategory?.toUpperCase()}{' '}
                  <Typography component="span" sx={{ pl: '5px', color: '#989c9b' }}>
                    ({total} products)
                  </Typography>
                </Typography>
                <SortingByPriceAndName />
              </Box>
            )}
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
