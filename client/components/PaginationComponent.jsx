import { Stack, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

const PaginationComponent = ({ changePage }) => {
  const pages = useSelector((state) => state.searchPageSlice.metaData.pages);
  const currentPage = useSelector((state) => state.searchPageSlice.currentPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pages}
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
