import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PopularCategorySectionItem from './PopularCategorySectionItem';
import clothingImg from '../public/clothing.avif';
import bagsImg from '../public/backpack.avif';
import tentsImg from '../public/camping.webp';
import shoesImg from '../public/footwear.webp';

const PopularCategorySection = () => {
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  return (
    <Box m="0 auto 40px auto" width="100%">
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center', mb: ' 20px' }}>
        Shop By Section
      </Typography>
      <Box mb="20px" display="flex" justifyContent="space-between">
        <PopularCategorySectionItem
          img={clothingImg}
          title={'Clothing'}
          path={'shop/all/clothing'}
        />
        <PopularCategorySectionItem
          img={bagsImg}
          title={'Bags'}
          path={'shop/all/accessories/bags'}
        />
        <PopularCategorySectionItem img={tentsImg} title={'Camping'} path={'shop/all/camp-sleep'} />
        <PopularCategorySectionItem img={shoesImg} title={'Footwear'} path={'shop/all/footwear'} />
      </Box>
    </Box>
  );
};

export default PopularCategorySection;
