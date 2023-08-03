import { useDispatch, useSelector } from 'react-redux';
import { setBrandsChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const BrandFilter = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.search.brands);
  const status = useSelector((state) => state.search.status);

  const handleChange = (event) => {
    dispatch(setBrandsChecked(event.target.name));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        BRAND
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {brands &&
            brands.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '4px' }}
                    disabled={status === 'resolved' ? false : true}
                    onChange={handleChange}
                    name={item.toLowerCase()}
                  />
                }
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                key={item}
              />
            ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default BrandFilter;
