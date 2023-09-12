import Slider from '@mui/material/Slider';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChangePrice } from '@/state/searchPageSlice';
import { useDebounce } from 'use-debounce';

const PriceSlider = ({ resetPriceSlider }) => {
  const dispatch = useDispatch();

  const priceMinAndMax = useSelector((state) => state.searchPageSlice.priceMinAndMax);
  const inputSearchValue = useSelector((state) => state.searchPageSlice.inputSearchValue);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);
  const pageCategory = useSelector((state) => state.searchPageSlice.pageCategory);

  const [value, setValue] = useState([1, 9999]);
  const [debouncedValue] = useDebounce(value, 800);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue([1, 9999]);
  }, [inputSearchValue, resetPriceSlider, pageCategory]);

  useEffect(() => {
    if (debouncedValue[1] !== 9999) {
      dispatch(setChangePrice(debouncedValue));
    }
  }, [debouncedValue]);

  return (
    <Box width={mobile ? '100%' : '85%'} textAlign="center" mb="10px">
      {!mobile && (
        <Typography textAlign="left" fontWeight="bold" mb="15px">
          PRICE
        </Typography>
      )}

      {
        <Slider
          sx={{
            width: mobile ? '80%' : '90%',
            mt: '-10px',
          }}
          value={value}
          valueLabelDisplay="auto"
          onChange={handleChange}
          min={priceMinAndMax && Number(priceMinAndMax[0])}
          max={priceMinAndMax && Number(priceMinAndMax[1])}
        />
      }

      <Box
        m={mobile ? '-10px auto 0 auto' : '-10px 0 0 0'}
        width={mobile ? '90%' : '100%'}
        display="flex"
        justifyContent="space-between">
        <Typography>{priceMinAndMax[0]}</Typography>
        <Typography>{priceMinAndMax[1]}</Typography>
      </Box>
    </Box>
  );
};

export default PriceSlider;
