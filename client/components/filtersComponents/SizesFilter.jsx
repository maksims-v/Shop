import useSWR from 'swr';
const qs = require('qs');

import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { setSizesChecked } from '@/state/searchPageSlice';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const fetchQuery = qs.stringify({
  populate: { size: true },
});

const SizesFilter = () => {
  const { data } = useSWR(`${process.env.API_URL}/api/sizes?${fetchQuery}`, fetcher);

  const [formats, setFormats] = useState();
  const [currentSizes, setCurrentSizes] = useState(
    data?.data[0]?.attributes?.size.map((item) => {
      return item.size.toLowerCase();
    }),
  );

  const { sizes, sizesChecked, mobile } = useSelector((state) => state.searchPageSlice);

  const dispatch = useDispatch();

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
                  lineHeight: '15px',
                  fontSize: '12px',
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
