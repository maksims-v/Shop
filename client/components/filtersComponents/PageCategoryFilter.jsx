import { useDispatch, useSelector } from 'react-redux';
import { setpageChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const PageCategoryFilter = () => {
  const dispatch = useDispatch();
  const pageCategory = useSelector((state) => state.searchPageSlice.pageCategory);
  const status = useSelector((state) => state.searchPageSlice.status);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const handleChange = (event) => {
    dispatch(setpageChecked(event.target.name));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
        {mobile ? null : 'page'}
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {pageCategory &&
            pageCategory?.map((item, index) => {
              if (item !== 'all') {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
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

export default PageCategoryFilter;
