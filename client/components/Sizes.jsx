import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { setSizesChecked } from '@/state/searchPageSlice';

const Sizes = () => {
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
    dispatch(setSizesChecked(formats));
  }, [formats]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Box>
      <Typography sx={{ mb: '5px' }} fontWeight="bold">
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
        {sizes.map((item) => {
          return (
            <ToggleButton
              key={item}
              value={item}
              aria-label={item}
              sx={{
                ml: '0px !Important',
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

export default Sizes;
