import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters, setDiscounts } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import SubCategoryFilter from 'components/filtersComponents/SubCategoryFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import Link from 'next/link';
import Layout from 'components/Layout';
import CategoryMobileVersion from '../../../../../components/mobileVersionPage/CategoryMobileVersion';

const Category = ({ gender, category }) => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.searchPageSlice.searchFlag);
  const currentPage = useSelector((state) => state.searchPageSlice.currentPage);
  const sortValue = useSelector((state) => state.searchPageSlice.sortValue);
  const total = useSelector((state) => state.searchPageSlice.metaData.total);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  useEffect(() => {
    dispatch(clearAllFilters());
  }, [gender]);

  useEffect(() => {
    dispatch(search({ gender, category }));
  }, [searchFlag, gender, category]);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(search({ gender, category }));
  };

  return mobile ? (
    <CategoryMobileVersion
      gender={gender}
      category={category}
      handleChange={handleChange}
      clearFilters={clearFilters}
    />
  ) : (
    <Box mt="50px">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px' }}>
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/${gender}`}>
          {gender?.toUpperCase()}
        </Link>
        <Link
          style={{ pointerEvents: 'none', fontWeight: 'bold' }}
          underline="hover"
          color="inherit"
          href={`/${gender}/${category}`}>
          {category?.toUpperCase()}
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
          {!mobile && (
            <Box display="flex" justifyContent="space-between" mb="10px">
              <Typography variant="h1" sx={{ fontSize: '22px', fontWeight: '600' }}>
                {gender?.toUpperCase()} {category?.toUpperCase()}{' '}
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
  );
};

export default Category;

export async function getServerSideProps({ params }) {
  const { gender, category } = params;

  return { props: { gender, category } };
}
