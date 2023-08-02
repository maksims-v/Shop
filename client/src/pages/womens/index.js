import PriceSlider from 'components/PriceSlider';
import BrandFilter from 'components/BrandFilter';
import SaleClearanceFilter from 'components/SaleFilter';
import CategoryFilter from 'components/CategoryFilter';
import SubCategoryFilter from 'components/SubCategoryFilter';
import PaginationComponent from 'components/PaginationComponent';
import SizesFilter from 'components/SizesFilter';
import { Box, Divider } from '@mui/material';
import Item from 'components/Item';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, search, inputValue } from '@/state/searchPageSlice';

const index = () => {
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
    dispatch(search("women's"));
  }, [searchFlag]);

  const changePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Box pl="2px" m="10px 0px" fontSize="24px">
        WOMEN'S
      </Box>
      <PaginationComponent page={page} changePage={changePage} currentPage={currentPage} />
      <Box display="flex">
        <Box flex="1 1 10%">
          <Box fontSize="18px">FILTERS</Box>
          <Divider sx={{ width: '90%', mb: '10px' }} />
          <SaleClearanceFilter />
          <CategoryFilter />
          <SubCategoryFilter />
          <BrandFilter />
          <PriceSlider />
          <SizesFilter />
        </Box>
        <Box
          flex="1 1 80%"
          margin="0 auto"
          display="grid"
          justifyContent="space-around"
          columnGap="1.33"
          rowGap="20px"
          gridTemplateColumns="repeat(auto-fill, 250px)">
          {data && data?.map((item) => <Item key={item.id} item={item} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default index;
