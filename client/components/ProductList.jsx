import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setSortValue } from '@/state/searchPageSlice';
import SortingByPriceAndName from './SortingByPriceAndName';
import PaginationComponent from './PaginationComponent';
import Item from './Item';

const ProductList = ({ gender, category }) => {
  const data = useSelector((state) => state.search.data);
  const mobile = useSelector((state) => state.search.mobile);

  const total = useSelector((state) => state.search.metaData.total);

  const dispatch = useDispatch();

  const changePage = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Box m="0 auto" width="100%">
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
      <Box
        mb="20px"
        display="grid"
        justifyContent="space-around"
        columnGap="1.33"
        rowGap="0px"
        gridTemplateColumns={mobile ? 'repeat(auto-fill, 180px)' : 'repeat(auto-fill, 250px)'}>
        {data && data?.map((item) => <Item key={item.id} item={item} />)}
      </Box>
      <PaginationComponent changePage={changePage} />
    </Box>
  );
};

export default ProductList;
