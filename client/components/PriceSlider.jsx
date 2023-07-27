import Slider from '@mui/material/Slider';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChangePrice } from '@/state/searchPageSlice';
import { useDebounce } from 'use-debounce';

const PriceSlider = () => {
  const dispatch = useDispatch();

  const priceMin = useSelector((state) => state.search.metaData.priceMin);
  const priceMax = useSelector((state) => state.search.metaData.priceMax);
  const changePrice = useSelector((state) => state.search.metaData.priceMax);

  const [value, setValue] = useState(priceMin ? [Number(priceMin), Number(priceMax)] : [0, 10000]);
  const [debouncedValue] = useDebounce(value, 800);

  useEffect(() => {
    // dispatch(setChangePrice(debouncedValue));
  }, [debouncedValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width="85%" textAlign="center" mb="10px">
      <Typography textAlign="left" fontWeight="bold">
        PRICE
      </Typography>

      <Slider
        sx={{ width: '90%' }}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={priceMin && Number(priceMin)}
        max={priceMax && Number(priceMax)}
      />
      <Box display="flex" justifyContent="space-between" mt="-10px">
        <Typography>{debouncedValue[0]}</Typography>
        <Typography>{debouncedValue[1]}</Typography>
      </Box>
    </Box>
  );
};

export default PriceSlider;
