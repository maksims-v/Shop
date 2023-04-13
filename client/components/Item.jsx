import Link from 'next/link';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  CardActionArea,
  Box,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Item({ item }) {
  return (
    <Card sx={{ maxWidth: 280, m: '10px 0px', height: '500px', backgroundColor: '#fdfdfd' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="0px 10px 0px 10px"
        height="54px">
        <Box fontSize="14px" fontWeight="bold">
          {item?.attributes?.new && <Box color="#0085ca">NEW</Box>}
          {item?.attributes?.sale && (
            <Box fontWeight="bold" fontSize="14px" color="red" textAlign="left">
              SALE
            </Box>
          )}
        </Box>
        <IconButton aria-label="settings" sx={{ p: '0px' }}>
          <FavoriteIcon fontSize="large" sx={{ color: '#e65f5f' }} />
        </IconButton>
      </Box>
      <Divider />
      <Link href={`/productpage/${item.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:1337${item?.attributes?.image?.data[0]?.attributes?.url}`}
            alt="Paella dish"
          />
        </CardActionArea>
      </Link>

      <CardContent sx={{ p: '16px 16px 8px 16px' }}>
        <Typography sx={{ textAlign: 'left', height: '40px' }}>
          {item?.attributes?.title}
        </Typography>
        <Typography sx={{ textAlign: 'left', pt: '10px' }} variant="body2" color="text.secondary">
          {item?.attributes?.color}
        </Typography>
      </CardContent>

      <Divider />

      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '0px 0px 5px 10px',
          textAlign: 'left',
          height: '50px',
        }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', width: '100%', pl: '7px' }}>
          {' '}
          ${!item?.attributes?.salePrice ? item?.attributes?.price : item?.attributes?.salePrice}
        </Typography>
        {item?.attributes?.sale && (
          <Typography sx={{ fontSize: '14px', color: '#e65f5f', width: '100%' }}>
            save:{' '}
            {item?.attributes?.salePrice &&
              (item?.attributes?.price - item.attributes?.salePrice).toFixed(2)}{' '}
            $
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
