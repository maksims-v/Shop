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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Item({ sale, newItem }) {
  return (
    <Card sx={{ maxWidth: 280, m: '10px 0px' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="8px 10px 8px 10px"
        height="54px">
        <Box fontSize="18px" fontWeight="bold">
          {newItem && <Box color="#0085ca">NEW</Box>}
          {sale && (
            <Box fontWeight="bold" fontSize="18px" color="red" textAlign="left">
              SALE
            </Box>
          )}
        </Box>
        <IconButton aria-label="settings" sx={{ p: '0px' }}>
          <FavoriteIcon fontSize="large" sx={{ color: '#e65f5f' }} />
        </IconButton>
      </Box>
      <Link href="/itemdetail">
        <CardActionArea>
          <CardMedia component="img" height="194" image="/7.webp" alt="Paella dish" />
          <CardContent>
            <Typography sx={{ textAlign: 'left' }}>
              Columbia Powder Lite Insulated Jacket - Mens
            </Typography>
            <Typography
              sx={{ textAlign: 'left', pt: '10px' }}
              variant="body2"
              color="text.secondary">
              Bright Indigo
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: '0px 0px 5px 10px',
              textAlign: 'left',
              height: '56px',
            }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', width: '100%', pl: '7px' }}>
              {' '}
              $16.41
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#e65f5f', width: '100%' }}>
              save: $16.41 $
            </Typography>
          </CardActions>
        </CardActionArea>
      </Link>
    </Card>
  );
}
