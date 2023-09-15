const qs = require('qs');
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
import PageCategoryFilter from 'components/filtersComponents/PageCategoryFilter';
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import Link from 'next/link';
import CategoryMobileVersion from '../../../../../components/mobileVersionPage/CategoryMobileVersion';
import ProductPageBanner from 'components/ProductPageBanner';

const onHoverLine = {
  display: 'inline-block',
  position: 'relative',
  '&:after': {
    content: "''",
    position: 'absolute',
    width: '100%',
    transform: 'scaleX(0)',
    height: '2px',
    bottom: '0',
    left: '0',
    backgroundColor: '#f5b950',
    transformOrigin: 'bottom right',
    transition: 'transform 0.25s ease-out',
  },
  '&:hover:after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
};

const Category = ({ pageCategory, category, pageBannerData }) => {
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
  }, [pageCategory]);

  useEffect(() => {
    dispatch(search({ pageCategory, category }));
  }, [searchFlag, pageCategory, category]);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(search({ pageCategory, category }));
  };

  return mobile ? (
    <CategoryMobileVersion
      pageCategory={pageCategory}
      category={category}
      handleChange={handleChange}
      clearFilters={clearFilters}
    />
  ) : (
    <Box mt="50px">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px' }}>
        <Link underline="hover" color="inherit" href="/">
          <Box sx={onHoverLine}>HOME</Box>
        </Link>
        <Link underline="hover" color="inherit" href={`/shop/${pageCategory}`}>
          <Box sx={onHoverLine}>{pageCategory?.toUpperCase()}</Box>
        </Link>
        <Link
          style={{ pointerEvents: 'none', fontWeight: 'bold' }}
          underline="hover"
          color="inherit"
          href={`/shop/${pageCategory}/${category}`}>
          {category?.toUpperCase()}
        </Link>
      </Breadcrumbs>

      <Box display="flex">
        <Box flex="1 1 10%">
          <PageCategoryFilter />
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
                {pageCategory?.toUpperCase()} {category?.toUpperCase()}{' '}
                <Typography component="span" sx={{ pl: '5px', color: '#989c9b' }}>
                  ({total} products)
                </Typography>
              </Typography>
              <SortingByPriceAndName />
            </Box>
          )}
          <ProductPageBanner pageBannerdata={pageBannerData} />
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
};

export default Category;

export async function getServerSideProps({ params }) {
  const { pageCategory, category } = params;

  const query = qs.stringify(
    {
      filters: {
        pageCategory: pageCategory,
        $or: [
          {
            category: {
              $eqi: category,
            },
          },
          {
            equipmentCategory: {
              $eqi: category,
            },
          },
        ],
        showOnCategoryBanner: true,
      },
      populate: {
        image: true,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const pageBannerResponse = await fetch(`${process.env.API_URL}/api/products?${query}`);

  const pageBannerResponseJson = await pageBannerResponse.json();

  return { props: { pageCategory, category, pageBannerData: pageBannerResponseJson.data } };
}
