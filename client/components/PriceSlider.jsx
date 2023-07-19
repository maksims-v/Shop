import Slider from '@mui/material/Slider';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeMinPrice, setChangeMaxPrice, setPrice } from '@/state/searchPageSlice';
import { useDebounce } from 'use-debounce';

const PriceSlider = () => {
  const dispatch = useDispatch();
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const changeMinPrice = useSelector((state) => state.search.changeMinPrice);
  const changeMaxPrice = useSelector((state) => state.search.changeMaxPrice);

  const [value, setValue] = useState([changeMinPrice, changeMaxPrice]);
  const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    setValue([changeMinPrice, changeMaxPrice]);
  }, [changeMinPrice, changeMaxPrice]);

  useEffect(() => {
    dispatch(setChangeMinPrice(debouncedValue[0]));
    dispatch(setChangeMaxPrice(debouncedValue[1]));
    dispatch(setPrice());
  }, [debouncedValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      min={Number(minPrice)}
      max={Number(maxPrice)}
    />
  );
};

export default PriceSlider;
