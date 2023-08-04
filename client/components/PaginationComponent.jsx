import { Stack, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '@/state/searchPageSlice';
import { useEffect, useState } from 'react';

const PaginationComponent = () => {
  const pages = useSelector((state) => state.search.metaData.pages);
  const currentPage = useSelector((state) => state.search.currentPage);
  const sortValue = useSelector((state) => state.search.sortValue);

  const [current, setCurrent] = useState(currentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [sortValue]);

  useEffect(() => {
    setCurrent(currentPage);
  }, [sortValue, currentPage]);

  const changePage = (event, value) => {
    setCurrent(currentPage);

    dispatch(setCurrentPage(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pages}
        page={current}
        onChange={changePage}
        variant="outlined"
        shape="rounded"
        sx={{ m: '0 auto' }}
      />
    </Stack>
  );
};

export default PaginationComponent;
