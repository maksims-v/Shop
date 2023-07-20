import Slider from '@mui/material/Slider';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeMinPrice, setChangeMaxPrice } from '@/state/searchPageSlice';
import { useDebounce } from 'use-debounce';

const PriceSlider = () => {
  const dispatch = useDispatch();
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const changeMinPrice = useSelector((state) => state.search.changeMinPrice);
  const changeMaxPrice = useSelector((state) => state.search.changeMaxPrice);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);

  const [value, setValue] = useState([changeMinPrice, changeMaxPrice]);
  const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    setValue([changeMinPrice, changeMaxPrice]);
  }, [inputSearchValue, changeMinPrice, changeMaxPrice]);

  useEffect(() => {
    dispatch(setChangeMinPrice(debouncedValue[0]));
    dispatch(setChangeMaxPrice(debouncedValue[1]));
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
      min={minPrice}
      max={maxPrice}
    />
  );
};

export default PriceSlider;
