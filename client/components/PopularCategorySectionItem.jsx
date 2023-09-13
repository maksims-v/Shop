import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const PopularCategorySectionItem = ({ item }) => {
  return (
    <Link href={`shop/${item.pageCategory}/${item.category}`}>
      <Box
        sx={{
          height: '300px',
          width: '270px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
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
          }}>
          {item.title}
        </Typography>
      </Box>
    </Link>
  );
};

export default PopularCategorySectionItem;
