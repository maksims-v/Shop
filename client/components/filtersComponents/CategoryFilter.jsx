import { useDispatch, useSelector } from 'react-redux';
import { setCategoryChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useRouter } from 'next/router';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.searchPageSlice.category);
  const status = useSelector((state) => state.searchPageSlice.status);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const router = useRouter();

  const { query } = router;

  const handleChange = (event) => {
    dispatch(setCategoryChecked(event.target.name));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
        {mobile ? null : query.pageCategory == 'equipment' ? 'EQUIPMENT' : 'CLOTHING & SHOES'}
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {category &&
            category.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: mobile ? '1px' : '2px' }}
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

export default CategoryFilter;
