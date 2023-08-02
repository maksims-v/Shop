import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { setSizesChecked, setChangePrice } from '@/state/searchPageSlice';

let order = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

let sizess = ['S', 'XL', 'XS', '3XL', 'XS', '2XL'];

sizess.sort(function (a, b) {
  return order.indexOf(a) - order.indexOf(b);
});

const SizesFilter = () => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.search.sizes);

  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);

  const [inputValue, setInpustValue] = useState('');
  const [formats, setFormats] = useState();

  useEffect(() => {
    setInpustValue(inputSearchValue);
    if (inputSearchValue !== inputValue) {
      setFormats(false);
    }
  }, [inputSearchValue]);

  useEffect(() => {
    if (formats) {
      dispatch(setSizesChecked(formats));
    }
  }, [formats]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Box>
      <Typography sx={{ mb: '5px', pl: '2px' }} fontWeight="bold">
        SIZE
      </Typography>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          pl: '0px',
        }}>
        {sizes &&
          sizes.map((item) => {
            return (
              <ToggleButton
                key={item}
                value={item}
                aria-label={item}
                sx={{
                  ml: '0px !Important',
                  m: '1px',
                  height: '40px',
                  width: '40px',
                  borderLeft: '1px solid rgba(0, 0, 0, 0.12) !Important',
                }}>
                {item}
              </ToggleButton>
            );
          })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SizesFilter;
