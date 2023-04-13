import { Box, Button, IconButton, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useCallback, useEffect } from 'react';
import Item from '../../../components/Item';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import Gallery from 'react-photo-gallery-next';
import Carousel, { Modal, ModalGateway } from 'react-images';
import React from 'react';
import { useRouter } from 'next/router';

const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
];

const ItemDetails = () => {
  const router = useRouter();
  const id = router.query.id;

  const dispatch = useDispatch();
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [photoSrc, setPhotoSrc] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  async function getItems() {
    const data = await fetch(`http://localhost:1337/api/products/${id}`, {
      method: 'GET',
    });
    const item = await data.json();

    console.log(item);
  }

  useEffect(() => {
    getItems();
  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setPhotoSrc(photo);
    setCurrentImage(index);
    //  setViewerIsOpen(true);
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
    <Box width="80%" m="80px auto">
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
              alt={item?.name}
              width="100%"
              height="500px"
              src={photoSrc?.src}
              style={{ objectFit: 'contain' }}
            />
            <Box>
              <Gallery targetRowHeight={50} photos={photos} onClick={openLightbox} />
              <ModalGateway>
                {viewerIsOpen ? (
                  <Modal onClose={closeLightbox}>
                    <Box>
                      <Carousel
                        currentIndex={currentImage}
                        views={photos.map((x) => ({
                          ...x,
                          srcset: x.srcSet,
                          caption: x.title,
                        }))}
                      />
                    </Box>
                  </Modal>
                ) : null}
              </ModalGateway>
            </Box>
          </Box>
        </Box>

        <Box flex="1 1 45%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">Columbia Powder Lite Insulated Jacket - Mens</Typography>
            <Typography>$ 18.62</Typography>
            <Typography sx={{ mt: '20px' }}>{item?.attributes?.longDescription}</Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid black`}
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
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}>
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
        {value === 'description' && <div>{item?.attributes?.longDescription}</div>}
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
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
