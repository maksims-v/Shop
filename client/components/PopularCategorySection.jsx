import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PopularCategorySectionItem from './PopularCategorySectionItem';

const PopularCategorySection = ({ sectionPopularCategoryData }) => {
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  return (
    <Box m="0 auto 60px auto" width="100%">
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', fontSize: '32px', textAlign: 'center', mb: ' 30px' }}>
        Popular Categories
      </Typography>
      <Box mb="20px" display="flex" justifyContent="space-between">
        {sectionPopularCategoryData[0]?.attributes?.popularCategeory?.map((item) => {
          return item.isShow && <PopularCategorySectionItem key={item.id} item={item} />;
        })}
      </Box>
    </Box>
  );
};

export default PopularCategorySection;
