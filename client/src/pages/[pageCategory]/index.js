const qs = require('qs');
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters, setDiscounts } from '@/state/searchPageSlice';
import ProductList from 'components/ProductList';
import SaleFilter from 'components/filtersComponents/SaleFilter';
import CategoryFilter from 'components/filtersComponents/CategoryFilter';
import SubCategoryFilter from 'components/filtersComponents/SubCategoryFilter';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import PriceSlider from 'components/filtersComponents/PriceSlider';
import SizesFilter from 'components/filtersComponents/SizesFilter';
import PageCategoryFilter from 'components/filtersComponents/PageCategoryFilter';
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import Link from 'next/link';
import PageCategoryMobileVersion from 'components/mobileVersionPage/PageCategoryMobileVersion';
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

const Index = ({ pageCategory, pageBannerdata }) => {
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
    dispatch(search({ pageCategory }));
  }, [searchFlag, pageCategory]);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(search({ pageCategory }));
  };

  return mobile ? (
    <PageCategoryMobileVersion clearFilters={clearFilters} pageCategory={pageCategory} />
  ) : (
    <Box mt="50px">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px' }}>
        <Link color="inherit" href="/">
          <Box sx={onHoverLine}> HOME</Box>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          style={{ pointerEvents: 'none', fontWeight: 'bold' }}
          href={`/${pageCategory}`}>
          {pageCategory?.toUpperCase()}
        </Link>
      </Breadcrumbs>

      <Box display="flex">
        <Box flex="1 1 10%">
          <PageCategoryFilter />
          <PriceSlider />
          <SaleFilter handleChange={handleChange} />
          <CategoryFilter />
          <SubCategoryFilter />
          <BrandFilter />
          <SizesFilter />
        </Box>

        <Box flex="1 1 80%">
          {!mobile && (
            <Box display="flex" justifyContent="space-between" mb="20px">
              <Typography variant="h3" sx={{ fontSize: '22px', fontWeight: '600' }}>
                {pageCategory?.toUpperCase()}
                <Typography component="span" sx={{ pl: '5px', color: '#989c9b' }}>
                  ({total} products)
                </Typography>
              </Typography>
              <SortingByPriceAndName />
            </Box>
          )}
          <ProductPageBanner pageBannerdata={pageBannerdata} />
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;

export async function getServerSideProps({ params }) {
  const { pageCategory } = params;

  const query = qs.stringify(
    {
      filters: {
        pageCategory: pageCategory,
        showOnBanner: true,
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

  return {
    props: {
      pageCategory,
      pageBannerdata: pageBannerResponseJson.data,
    },
  };
}
