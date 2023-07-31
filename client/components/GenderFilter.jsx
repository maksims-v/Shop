import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenderChecked, filtersSearch } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const GenderFilter = () => {
  const dispatch = useDispatch();
  const { genders } = useSelector((state) => state.search.metaData);

  const handleChange = (event) => {
    dispatch(setGenderChecked(event.target.name));
    dispatch(filtersSearch());
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        Gender
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {genders &&
            genders.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox sx={{ p: '4px' }} onChange={handleChange} name={item.toLowerCase()} />
                }
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                key={item}
              />
            ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default GenderFilter;
