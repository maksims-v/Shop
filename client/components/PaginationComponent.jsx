import { Stack, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '@/state/searchPageSlice';

const PaginationComponent = () => {
  const page = useSelector((state) => state.search.metaData.pages);
  const currentPage = useSelector((state) => state.search.currentPage);

  const dispatch = useDispatch();

  const changePage = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={page}
        page={currentPage}
        onChange={changePage}
        variant="outlined"
        shape="rounded"
        sx={{ m: '0 auto' }}
      />
    </Stack>
  );
};

export default PaginationComponent;
