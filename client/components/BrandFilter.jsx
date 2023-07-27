import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandsChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const BrandFilter = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.search.metaData.brands);

  const [state, setState] = useState(
    brands
      ? brands.reduce((obj, key) => {
          obj[key] = false;
          return obj;
        }, {})
      : [],
  );

  useEffect(() => {
    const brandsFilter = Object.entries(state);

    const getBrandsFilter = brandsFilter
      .filter((item, index) => {
        if (item[1]) return item;
      })
      .map((item) => {
        if (item[1]) return item[0];
      });

    dispatch(setBrandsChecked(getBrandsFilter));
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
        BRAND
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {brands &&
            brands.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox sx={{ p: '4px' }} onChange={handleChange} name={item.toLowerCase()} />
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
