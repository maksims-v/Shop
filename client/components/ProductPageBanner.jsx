import { Box, CardActionArea, CardMedia, CardContent, Typography, Card } from '@mui/material';
import Link from 'next/link';

const ProductPageBanner = ({ pageBannerdata }) => {
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
        <Link
          href={`/shop/${item?.attributes?.pageCategory}/${
            (item?.attributes?.category !== 'null' && item?.attributes?.category) ||
            (item?.attributes?.equipmentCategory !== 'null' && item?.attributes?.equipmentCategory)
          }/${
            (item?.attributes?.toolsGearCategory !== 'null' &&
              item?.attributes?.toolsGearCategory) ||
            (item?.attributes?.campSleepCategory !== 'null' &&
              item?.attributes?.campSleepCategory) ||
            (item?.attributes?.lampsLanternsCategory !== 'null' &&
              item?.attributes?.lampsLanternsCategory) ||
            (item?.attributes?.footwearCategory !== 'null' && item?.attributes?.footwearCategory) ||
            (item?.attributes?.clothingCategory !== 'null' && item?.attributes?.clothingCategory) ||
            (item?.attributes?.otherCategory !== 'null' && item?.attributes?.otherCategory) ||
            (item?.attributes?.activityCategory !== 'null' && item?.attributes?.activityCategory) ||
            (item?.attributes?.accessoriesCategory !== 'null' &&
              item?.attributes?.accessoriesCategory)
          }/${item?.attributes?.slug}`}>
          <CardActionArea sx={{ display: 'flex' }}>
            <CardMedia
              sx={{ height: '100%', width: '220px' }}
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

export default ProductPageBanner;
