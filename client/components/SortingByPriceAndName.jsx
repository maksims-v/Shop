import { Box, NativeSelect } from '@mui/material';
import { setSortValue } from '@/state/searchPageSlice';
import { useDispatch, useSelector } from 'react-redux';

const SortingByPriceAndName = () => {
  const status = useSelector((state) => state.searchPageSlice.status);
  const sortValue = useSelector((state) => state.searchPageSlice.sortValue);
  const dispatch = useDispatch();

  const getSortValue = (e) => {
    dispatch(setSortValue(e.target.value));
  };

  return (
    status == 'resolved' && (
      <Box sx={{ minWidth: 120 }}>
        <NativeSelect defaultValue={sortValue} onChange={getSortValue}>
          <option value={'Sort By'}>Sort By</option>
          <option value={'Latest arrivals'}>Latest arrivals</option>
          <option value={'Price asc.'}>Price asc.</option>
          <option value={'Price desc.'}>Price desc.</option>
        </NativeSelect>
      </Box>
    )
  );
};

export default SortingByPriceAndName;
