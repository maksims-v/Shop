import { Box, FormControl, NativeSelect } from '@mui/material';

const FilteringByPriceAndName = ({ getValue }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect onChange={getValue}>
          <option value={'Sort By'}>Sort By</option>
          <option value={'Latest arrivals'}>Latest arrivals</option>
          <option value={'Price asc.'}>Price asc.</option>
          <option value={'Price desc.'}>Price desc.</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default FilteringByPriceAndName;
