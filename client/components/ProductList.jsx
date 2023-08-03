import { Box, Typography } from '@mui/material';
import Item from './Item';
import FilteringByPriceAndName from './FilteringByPriceAndName';
import { useSelector, useDispatch } from 'react-redux';
import PaginationComponent from './PaginationComponent';
import { setSortValue } from '@/state/searchPageSlice';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const data = useSelector((state) => state.search.data);
  const sortValue = useSelector((state) => state.search.sortValue);

  const dispatch = useDispatch(sortValue);

  const getValue = (e) => {
    dispatch(setSortValue(e.target.value));
  };

  return (
    <Box m="0 auto">
      <Box display="flex" justifyContent="space-between" mb="10px">
        <Typography>SEARCH</Typography>
        <FilteringByPriceAndName getValue={getValue} />
      </Box>

      <Box
        mb="20px"
        display="grid"
        justifyContent="space-around"
        columnGap="1.33"
        rowGap="0px"
        gridTemplateColumns="repeat(auto-fill, 250px)">
        {data && data?.map((item) => <Item key={item.id} item={item} />)}
      </Box>
      <PaginationComponent />
    </Box>
  );
};

export default ProductList;
