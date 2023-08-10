import { useDispatch, useSelector } from 'react-redux';
import { setGenderChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { object } from 'yup';

const GenderFilter = () => {
  const dispatch = useDispatch();
  const genders = useSelector((state) => state.search.genders);
  const status = useSelector((state) => state.search.status);
  const mobile = useSelector((state) => state.search.mobile);
  const [addBoleanGenders, setAddBoleanGenders] = useState();
  const [genderArr, setGenderArr] = useState(addBoleanGenders && Object.entries(addBoleanGenders));

  // useEffect(() => {
  //   setAddBoleanGenders(
  //     genders?.reduce((object, value) => {
  //       return { ...object, [value]: false };
  //     }, {}),
  //   );
  //   setGenderArr(addBoleanGenders && Object.entries(addBoleanGenders));
  // }, [genders, addBoleanGenders]);

  const handleChange = (event) => {
    setAddBoleanGenders({
      ...addBoleanGenders,
      [event.target.name]: event.target.checked,
    });

    dispatch(setGenderChecked(event.target.name));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
        {mobile ? null : 'Gender'}
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {genders &&
            genders?.map((item, index) => {
              if (item !== 'all') {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addBoleanGenders?.name}
                        disabled={status === 'resolved' ? false : true}
                        sx={{ p: '2px' }}
                        onChange={handleChange}
                        name={item.toLowerCase()}
                      />
                    }
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                    key={item}
                  />
                );
              }
            })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default GenderFilter;
