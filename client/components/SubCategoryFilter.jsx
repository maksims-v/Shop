import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubCategoryChecked, setChangePrice } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const SubCategoryFilter = () => {
  const dispatch = useDispatch();

  const subCategory = useSelector((state) => state.search.metaData.subCategory);

  const [state, setState] = useState(
    subCategory
      ? subCategory.reduce((obj, key) => {
          obj[key] = false;
          return obj;
        }, {})
      : [],
  );

  useEffect(() => {
    const subCategoryFilter = Object.entries(state);

    const getSubCategoryFilter = subCategoryFilter
      .filter((item, index) => {
        if (item[1]) return item;
      })
      .map((item) => {
        if (item[1]) return item[0];
      });

    if (state.length !== 0 && state.length !== undefined) {
      dispatch(setSubCategoryChecked(getSubCategoryFilter));
    }
  }, [state]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        CATEGORIES
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {subCategory &&
            subCategory.map((item, index) => (
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

export default SubCategoryFilter;
