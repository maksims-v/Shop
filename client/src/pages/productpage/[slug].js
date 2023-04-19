import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Breadcrumbs,
  List,
  ListItem,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useCallback, useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Gallery from 'react-photo-gallery-next';
import Carousel, { Modal, ModalGateway } from 'react-images';
import React from 'react';
import Link from 'next/link';

const ItemDetails = ({ product }) => {
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  useEffect(() => {
    setData(product.data);
    createPhotoGallery(data?.attributes?.image?.data);
  }, [data]);

  function createPhotoGallery(data) {
    const gallery = data
      ? data &&
        data.map((item, i) => ({
          src: `http://localhost:1337${item?.attributes.url}`,
          width: 1,
          height: 1,
        }))
      : [];
    setPhotos(gallery);
  }

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
  }, []);

  const openModalPhoto = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width="100%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="1 1 50%">
          <Box
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}>
            <img
              onClick={openModalPhoto}
              alt={data?.name}
              width="100%"
              height="500px"
              src={`http://localhost:1337${data?.attributes?.image?.data[currentImage]?.attributes?.url}`}
              style={{ objectFit: 'contain' }}
            />
            <Box>
              <Gallery targetRowHeight={20} photos={photos} onClick={openLightbox} />
              <ModalGateway>
                {viewerIsOpen ? (
                  <Modal onClose={closeLightbox}>
                    <Carousel
                      currentIndex={currentImage}
                      views={photos.map((x) => ({
                        ...x,
                        srcset: x.srcSet,
                        caption: x.title,
                      }))}
                    />
                  </Modal>
                ) : null}
              </ModalGateway>
            </Box>
          </Box>
        </Box>

        <Box flex="1 1 45%" mb="40px">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              HOME
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/">
              Core
            </Link>
            <Typography color="text.primary">{data?.attributes?.category}</Typography>
          </Breadcrumbs>

          <Box m="65px 0 25px 0">
            <Typography sx={{ mb: '8px' }} variant="h3">
              {data?.attributes?.title}
            </Typography>

            <Divider />

            <Typography sx={{ fontSize: '18px' }}>
              ${data?.attributes?.salePrice ? data?.attributes?.salePrice : data?.attributes?.price}
            </Typography>

            <Typography sx={{ fontSize: '12px', color: data?.attributes?.salePrice && 'red' }}>
              {data?.attributes?.salePrice &&
                `Save:
              ${
                data?.attributes?.salePrice &&
                (data?.attributes?.price - data?.attributes?.salePrice).toFixed(2)
              }
              $`}
            </Typography>

            <Typography sx={{ mt: '20px' }}>{data?.attributes?.description}</Typography>
          </Box>
          <Box mb="10px">
            <List sx={{ display: 'flex', gap: '10px', p: '0px' }}>
              <ListItem
                sx={{
                  p: '0px',
                  backgroundColor: data?.attributes?.color,
                  height: '30px',
                  width: '30px',
                  border: '1px solid black',
                  borderRadius: '50%',
                }}></ListItem>
            </List>
          </Box>

          <Divider />
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border="1.5px solid black"
              mr="20px"
              p="2px 5px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
              }}>
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: asdasdass</Typography>
          </Box>
        </Box>
      </Box>

      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === 'description' && <div>{data?.attributes?.longDescription}</div>}
        {value === 'reviews' && <div>reviews</div>}
      </Box>

      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between">
          {/* {data.slice(0, 4).map((item, i) => (
            <Item key={`${data.name}-${i}`} data={data} />
          ))} */}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.API_URL}/api/products/${slug}?populate=*`);
  const product = await res.json();

  return { props: { product } };
}
