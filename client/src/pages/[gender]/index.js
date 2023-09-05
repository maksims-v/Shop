const qs = require('qs');
import { Box, Breadcrumbs, Typography, CardActionArea, CardMedia } from '@mui/material';
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
import SortingByPriceAndName from 'components/SortingByPriceAndName';
import Link from 'next/link';
import GenderMobileVersion from 'components/mobileVersionPage/GenderMobileVersion';

const PageGender = ({ gender, pageBannerdata }) => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.searchPageSlice.searchFlag);
  const currentPage = useSelector((state) => state.searchPageSlice.currentPage);
  const sortValue = useSelector((state) => state.searchPageSlice.sortValue);
  const total = useSelector((state) => state.searchPageSlice.metaData.total);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  console.log(pageBannerdata);

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
          <Box
            sx={{
              height: '280px',
              backgroundColor: '#f4f5f5',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                height: '100%',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f4f5f5',
              }}>
              <CardActionArea sx={{ height: '100%', backgroundColor: '#f4f5f5' }}>
                <CardMedia
                  sx={{ height: '100%' }}
                  component="img"
                  image={`${process.env.API_URL}${pageBannerdata?.image?.data?.attributes?.url}`}
                  alt="img"
                />
              </CardActionArea>
            </Box>
            <Box
              sx={{
                height: '100%',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CardActionArea sx={{ height: '100%' }}>
                <CardMedia
                  sx={{ height: '100%' }}
                  component="img"
                  image={`${process.env.API_URL}${pageBannerdata?.image?.data?.attributes?.url}`}
                  alt="img"
                />
              </CardActionArea>
            </Box>
          </Box>
          <ProductList gender={gender} />
        </Box>
      </Box>
    </Box>
  );
};

export default PageGender;

export async function getServerSideProps({ params }) {
  const { gender } = params;

  const query = qs.stringify(
    {
      populate: {
        product: {
          populate: ['gender', 'category', 'subcategory', 'image'],
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );

  const pageBannerResponse = await fetch(`${process.env.API_URL}/api/mens-page-banners?${query}`);

  const pageBannerResponseJson = await pageBannerResponse.json();

  return {
    props: {
      gender,
      pageBannerdata: pageBannerResponseJson?.data[0].attributes.product,
    },
  };
}
