import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDiscounts } from '@/state/searchPageSlice';

const SaleFilter = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.search.status);

  const handleChange = (event) => {
    dispatch(setDiscounts(event.target.name));
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
            control={<Checkbox sx={{ p: '4px' }} onChange={handleChange} name="Sale" />}
            label="Sale"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default SaleFilter;
