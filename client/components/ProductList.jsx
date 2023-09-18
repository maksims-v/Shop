import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setSortValue } from '@/state/searchPageSlice';
import PaginationComponent from './PaginationComponent';
import Item from './ProductCard';

const ProductList = () => {
  const data = useSelector((state) => state.searchPageSlice.data);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const dispatch = useDispatch();

  const changePage = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Box m="0 auto" width="100%">
      <Box
        mt="20px"
        mb="20px"
        display="grid"
        justifyContent="space-around"
        columnGap="5"
        rowGap="40px"
        gridTemplateColumns={mobile ? 'repeat(auto-fill, 180px)' : 'repeat(auto-fill, 235px)'}>
        {data && data?.map((item) => <Item key={item.id} item={item} />)}
      </Box>
      <PaginationComponent changePage={changePage} />
    </Box>
  );
};

export default ProductList;
