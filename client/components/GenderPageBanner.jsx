import { Box, CardActionArea, CardMedia, CardContent, Typography, Card } from '@mui/material';
import Link from 'next/link';

const GenderPageBanner = ({ pageBannerdata }) => {
  console.log(pageBannerdata);

  const bannerItems = pageBannerdata?.map((item) => {
    return (
      <Box
        key={item.id}
        sx={{
          height: 'auto',
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Link href={`/search/${item.attributes.title}`}>
          <CardActionArea sx={{ display: 'flex' }}>
            <CardMedia
              sx={{ height: '100%', maxWidth: '220px' }}
              component="img"
              image={`${process.env.API_URL}${item?.attributes?.image?.data[0]?.attributes?.formats?.medium?.url}`}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.attributes?.brand}
              </Typography>
              <Typography gutterBottom variant="h4" component="div">
                {item.attributes?.title}
              </Typography>
              <Box display="flex" flexDirection="column">
                {item.attributes.sale ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#bb3142',
                        width: '100%',
                      }}>
                      {item?.attributes.price}$
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        width: '100%',
                        pl: '3px',
                        textDecoration: 'line-through',
                      }}>
                      {item?.attributes.oldPrice} $
                    </Typography>
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#bb3142',
                      width: '100%',
                    }}>
                    {item?.attributes.price}$
                  </Typography>
                )}
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
      </Box>
    );
  });

  return (
    <Card
      sx={{
        m: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {bannerItems}
    </Card>
  );
};

export default GenderPageBanner;
