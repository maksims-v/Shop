import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const PopularCategorySectionItem = ({ item }) => {
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  return (
    <Box
      sx={{
        height: '300px',
        width: mobile ? '49.5%' : '270px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: mobile ? 'space-around' : 'center',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
      <Link href={`shop/${item.pageCategory}/${item.category}`}>
        <Box sx={{ '&:hover': { scale: '1.1', transition: '0.9s' } }}>
          <Box sx={{ '&:hover': { scale: '1.1', transition: '0.9s' } }}>
            <img
              src={`${process.env.API_URL}${item.image?.data?.attributes?.url}`}
              alt={item.title}
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: '24px',
            mb: '30px',
            color: 'white',
            position: 'absolute',
            bottom: '0px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          {item.title}
        </Typography>
      </Link>
    </Box>
  );
};

export default PopularCategorySectionItem;
