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
  const mobile = useSelector((state) => state.search.mobile);

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
    <Box sx={{ mb: mobile ? '20px' : '0px' }}>
      <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
        {mobile ? null : 'SIZE'}
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
                  color: 'black',
                  ml: '0px !Important',
                  m: '3px',
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
