import { useDispatch, useSelector } from 'react-redux';
import { setSubCategoryChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const SubCategoryFilter = () => {
  const dispatch = useDispatch();
  const subCategory = useSelector((state) => state.search.subCategory);
  const status = useSelector((state) => state.search.status);
  const mobile = useSelector((state) => state.search.mobile);

  const handleChange = (event) => {
    dispatch(setSubCategoryChecked(event.target.name));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
        {mobile ? null : 'CATEGORIES'}
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {subCategory &&
            subCategory.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '4px' }}
                    disabled={status === 'resolved' ? false : true}
                    onChange={handleChange}
                    name={item.toLowerCase()}
                  />
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
