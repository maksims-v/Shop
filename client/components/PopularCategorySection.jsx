import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PopularCategorySectionItem from './PopularCategorySectionItem';

const PopularCategorySection = ({ sectionPopularCategoryData }) => {
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  return (
    <Box m={mobile ? '0 auto' : '0 auto 60px auto'} width="100%" p={mobile ? '0px' : '0px 5px'}>
      {!mobile && (
        <Typography variant="h2" sx={{ textAlign: 'center', mb: ' 15px' }}>
          Popular Categories
        </Typography>
      )}
      <Box mb="20px" display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
        {sectionPopularCategoryData[0]?.attributes?.popularCategeory?.map((item) => {
          return item.isShow && <PopularCategorySectionItem key={item.id} item={item} />;
        })}
      </Box>
    </Box>
  );
};

export default PopularCategorySection;
