import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSale } from '@/state/searchPageSlice';

const SaleFilter = () => {
  const status = useSelector((state) => state.searchPageSlice.status);
  const data = useSelector((state) => state.searchPageSlice.data);
  const sale = useSelector((state) => state.searchPageSlice.sale);

  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(setSale());
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        Deals & Discounts
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            disabled={status === 'resolved' ? false : true}
            control={
              <Checkbox sx={{ p: '2px' }} onChange={handleChange} checked={sale} name="Sale" />
            }
            label="Sale"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default SaleFilter;
