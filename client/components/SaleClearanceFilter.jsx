import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDiscounts } from '@/state/searchPageSlice';

const SaleClearanceFilter = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    Sale: false,
    Clearance: false,
  });

  useEffect(() => {
    const salesFilter = Object.entries(state);

    const getSalesFilter = salesFilter
      .filter((item) => {
        if (item[1]) return item;
      })
      .map((item) => {
        if (item[1]) return item[0];
      });

    dispatch(setDiscounts(getSalesFilter));
  }, [state]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        Deals & Discounts
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox sx={{ p: '4px' }} onChange={handleChange} name="Sale" />}
            label="Sale"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default SaleClearanceFilter;
