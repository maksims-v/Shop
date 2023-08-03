import PriceSlider from 'components/PriceSlider';
import BrandFilter from 'components/filtersComponents/BrandFilter';
import SaleClearanceFilter from 'components/SaleFilter';
import CategoryFilter from 'components/filtersComponents/CategoryFilter';
import SubCategoryFilter from 'components/SubCategoryFilter';
import PaginationComponent from 'components/PaginationComponent';
import SizesFilter from 'components/SizesFilter';
import { Box, Divider, Typography, Breadcrumbs } from '@mui/material';
import Item from 'components/Item';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, search, inputValue } from '@/state/searchPageSlice';
import Link from 'next/link';

const Index = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const searchFlag = useSelector((state) => state.search.searchFlag);

  useEffect(() => {
    dispatch(inputValue(''));
    dispatch(clearFilters());
  }, []);

  useEffect(() => {
    dispatch(search("men's"));
  }, [searchFlag]);

  const changePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box pt="60px">
      <Box pl="2px" m="10px 0px" fontSize="24px"></Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        {/* <Link underline="hover" color="inherit" href={`/${data?.attributes?.gender}`}>
          {data && data.data[0]?.attributes?.gender.toUpperCase()}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/${data.data[0]?.attributes?.gender}/${data.data[0]?.attributes?.category}`}>
          {data && data.data[0]?.attributes?.category.toUpperCase()}
        </Link> */}
      </Breadcrumbs>

      <Box display="flex">
        <Box flex="1 1 10%">
          <Box fontSize="14px">FILTERS</Box>
          <Divider sx={{ width: '90%', mb: '10px' }} />
          <SaleClearanceFilter />
          <CategoryFilter />
          <SubCategoryFilter />
          <BrandFilter />
          <PriceSlider />
          <SizesFilter />
        </Box>

        <Box flex="1 1 80%" margin="0px auto 0 auto" flexDirection="column">
          <Box>
            <Typography fontWeight="bold" fontSize="21px" pl="15px">
              MEN
            </Typography>
          </Box>
          <Box
            display="grid"
            justifyContent="space-around"
            columnGap="1.33"
            gridTemplateColumns="repeat(auto-fill, 250px)">
            {data && data?.map((item) => <Item key={item.id} item={item} />)}
          </Box>
          <PaginationComponent page={page} changePage={changePage} currentPage={currentPage} />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
