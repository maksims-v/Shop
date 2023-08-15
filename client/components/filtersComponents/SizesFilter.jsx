import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { setSizesChecked } from '@/state/searchPageSlice';

const SizesFilter = () => {
  const dispatch = useDispatch();
  const sizes = useSelector((state) => state.search.sizes);
  const sizesChecked = useSelector((state) => state.search.sizesChecked);

  const mobile = useSelector((state) => state.search.mobile);

  const [formats, setFormats] = useState();

  useEffect(() => {
    setFormats(sizesChecked);
  }, [sizesChecked]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
    dispatch(setSizesChecked(newFormats));
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
                  m: '2px',
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
