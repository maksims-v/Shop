import Slider from '@mui/material/Slider';
import { Box, Typography } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChangePrice } from '@/state/searchPageSlice';
import { useDebounce } from 'use-debounce';

const PriceSlider = () => {
  const dispatch = useDispatch();

  const priceMin = useSelector((state) => state.search.metaData.priceMin);
  const priceMax = useSelector((state) => state.search.metaData.priceMax);

  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const changePrice = useSelector((state) => state.search.changePrice);

  const [value, setValue] = useState([1, 9999]);
  const [debouncedValue] = useDebounce(value, 800);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue([1, 9999]);
  }, [inputSearchValue]);

  useEffect(() => {
    if (debouncedValue[1] !== 9999) {
      dispatch(setChangePrice(debouncedValue));
    }
  }, [debouncedValue]);

  return (
    <Box width="85%" textAlign="center" mb="10px">
      <Typography textAlign="left" fontWeight="bold" mb="15px">
        PRICE
      </Typography>
      <Box display="flex" justifyContent="center" mt="-10px"></Box>
      <Slider
        sx={{ width: '90%' }}
        value={value}
        valueLabelDisplay="auto"
        onChange={handleChange}
        min={priceMin && Number(priceMin)}
        max={priceMax && Number(priceMax)}
      />
      <Box display="flex" justifyContent="space-between" mt="-10px">
        <Typography>{priceMin}</Typography>
        <Typography>{priceMax}</Typography>
      </Box>
    </Box>
  );
};

export default PriceSlider;
