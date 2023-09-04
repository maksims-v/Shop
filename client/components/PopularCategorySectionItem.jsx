import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const PopularCategorySectionItem = ({ img, title, path }) => {
  return (
    <>
      {' '}
      <Link href={path}>
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
            <Image alt="logo" src={img} width={270} height={300} />
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
            {title}
          </Typography>
        </Box>
      </Link>
    </>
  );
};

export default PopularCategorySectionItem;
