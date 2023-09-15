import { useDispatch, useSelector } from 'react-redux';
import { setPageCategoryChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const PageCategoryFilter = () => {
  const dispatch = useDispatch();
  const pageCategory = useSelector((state) => state.searchPageSlice.pageCategory);
  const status = useSelector((state) => state.searchPageSlice.status);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const handleChange = (event) => {
    dispatch(setPageCategoryChecked(event.target.name));
  };

  return (
    pageCategory.filter((item) => item !== 'all').length !== 1 && (
      <Box mb="10px">
        <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
          {mobile ? null : 'GENDER'}
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
                          sx={{ p: mobile ? '1px' : '2px' }}
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
    )
  );
};

export default PageCategoryFilter;
