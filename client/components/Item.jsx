import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Box,
  Skeleton,
} from '@mui/material';

import Link from 'next/link';
import { useSelector } from 'react-redux';

const Item = ({ item }) => {
  const mobile = useSelector((state) => state.search.mobile);
  const status = useSelector((state) => state.search.status);

  return (
    <Card
      sx={{
        maxWidth: 250,
        m: mobile ? '1px 0px' : '10px 0px',
        height: mobile ? '330px' : '400px',
        boxShadow: 'none',
      }}>
      <Link href={`/${item?.gender}/${item?.category}/${item?.subcategory}/${item?.slug}`}>
        {status === 'resolved' ? (
          <CardActionArea>
            <CardMedia
              component="img"
              image={`${process.env.API_URL}${item?.image}`}
              alt="Paella dish"
            />
          </CardActionArea>
        ) : (
          <Skeleton variant="rectangular" width={230} height={283} />
        )}
        {status === 'loading' ? (
          <Skeleton sx={{ mt: '20px' }} variant="rectangular" width={230} height={50} />
        ) : (
          <>
            <CardContent sx={{ p: '10px 16px 0px 16px' }}>
              <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>{item?.brand}</Typography>
            </CardContent>
            <CardContent sx={{ p: '0px 16px' }}>
              <Typography sx={{ textAlign: 'left', height: '50px', overflow: 'hidden' }}>
                {item?.title}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                p: '0px 0px 0px 10px',
                textAlign: 'left',
              }}>
              {item?.sale ? (
                <Box display="flex" pt="0px">
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#bb3142',
                      width: '100%',
                      pl: '5px',
                    }}>
                    {item?.price}$
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      pl: '5px',
                      pt: '9px',
                      width: '100%',
                      textDecoration: 'line-through',
                    }}>
                    {item?.sale ? item?.oldPrice : item?.price} $
                  </Typography>
                </Box>
              ) : (
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    pl: '5px',
                    pt: '5px',
                    width: '100%',
                  }}>
                  {item?.price} $
                </Typography>
              )}
            </CardActions>
          </>
        )}
      </Link>
    </Card>
  );
};

export default Item;
