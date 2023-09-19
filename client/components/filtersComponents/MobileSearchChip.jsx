import { Chip, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const MobileSearchChip = () => {
  const pageCategoryChecked = useSelector((state) => state.searchPageSlice.pageCategoryChecked);
  const categoryChecked = useSelector((state) => state.searchPageSlice.categoryChecked);
  const subCategoryChecked = useSelector((state) => state.searchPageSlice.subCategoryChecked);
  const sizesChecked = useSelector((state) => state.searchPageSlice.sizesChecked);
  const brandsChecked = useSelector((state) => state.searchPageSlice.brandsChecked);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={0.2}
      sx={{
        m: '0 auto',
        mb: '10px',
        color: 'black',
        gap: '1px',
      }}>
      {pageCategoryChecked?.map((item) => (
        <Chip key={item} label={item} size="small" />
      ))}
      {categoryChecked?.map((item) => (
        <Chip key={item} label={item} size="small" />
      ))}
      {subCategoryChecked?.map((item) => (
        <Chip key={item} label={item} size="small" />
      ))}
      {sizesChecked?.map((item) => (
        <Chip key={item} label={item} size="small" />
      ))}
      {brandsChecked?.map((item) => (
        <Chip key={item} label={item} size="small" />
      ))}
    </Stack>
  );
};

export default MobileSearchChip;
