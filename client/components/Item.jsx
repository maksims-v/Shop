import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Box,
  Divider,
} from '@mui/material';

const Item = ({ item }) => {
  const mobile = useSelector((state) => state.search.mobile);

  return (
    <Card
      sx={{
        maxWidth: 250,
        m: mobile ? '1px 0px' : '10px 0px',
        height: mobile ? '330px' : '465px',
        backgroundColor: '#fdfdfd',
      }}>
      {!mobile && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="0px 10px 0px 10px"
          height="54px">
          <Box fontSize="14px" fontWeight="bold">
            {item?.attributes?.sale && (
              <Box fontWeight="bold" fontSize="14px" color="red" textAlign="left">
                SALE
              </Box>
            )}
            {item?.attributes?.new && <Box color="#0085ca">NEW</Box>}
          </Box>
        </Box>
      )}

      <Link
        href={`/${item.attributes.gender}/${item.attributes.category}/${item.attributes.subcategory}/${item.attributes.slug}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`${process.env.API_URL}${item?.attributes?.image?.data[0]?.attributes?.formats?.small?.url}`}
            alt="Paella dish"
          />
        </CardActionArea>
      </Link>

      <CardContent sx={{ p: '16px 16px 8px 16px' }}>
        <Typography sx={{ textAlign: 'left', height: '40px' }}>
          {item?.attributes?.title}
        </Typography>
      </CardContent>

      <Divider sx={{ pt: '10px' }} />

      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '0px 0px 0px 10px',
          textAlign: 'left',
          height: '50px',
          justifyContent: 'center',
        }}>
        {item?.attributes?.sale && (
          <Typography
            sx={{
              fontSize: item?.attributes?.sale ? '20px' : '14px',
              fontWeight: item?.attributes?.sale ? 'bold' : 'none',
              color: '#e65f5f',
              width: '100%',
              pl: '5px',
            }}>
            {item?.attributes?.price}$
          </Typography>
        )}
        <Typography
          sx={{
            fontWeight: item?.attributes?.sale ? 'none' : 'bold',
            fontSize: item?.attributes?.sale ? '12px' : '20px',
            width: '100%',
          }}>
          {item?.attributes?.sale ? item?.attributes?.oldPrice : item?.attributes?.price} $
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Item;
