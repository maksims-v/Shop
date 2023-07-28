import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenderChecked, setChangePrice } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const GenderFilter = () => {
  const dispatch = useDispatch();
  const genders = useSelector((state) => state.search.metaData.genders);
  const genderChecked = useSelector((state) => state.search.genderChecked);

  const [state, setState] = useState(
    genders
      ? genders.reduce((obj, key) => {
          obj[key] = false;
          return obj;
        }, {})
      : [],
  );

  // useEffect(() => {
  //   const genderFilter = Object.entries(state);

  //   const getGenderFilter = genderFilter
  //     .filter((item, index) => {
  //       if (item[1]) return item;
  //     })
  //     .map((item) => {
  //       if (item[1]) return item[0];
  //     });

  //   dispatch(setGenderChecked(getGenderFilter));
  // }, [state]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    const genderFilter = Object.entries(state);

    dispatch(setGenderChecked(state));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        CATEGORY
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
