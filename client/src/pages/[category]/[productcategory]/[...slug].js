import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Breadcrumbs,
  ToggleButton,
  ToggleButtonGroup,
  Tabs,
  Tab,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState, useCallback, useEffect, forwardRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Gallery from 'react-photo-gallery-next';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Link from 'next/link';
import { addToBasket } from '@/state/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemDetails = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [size, setSize] = useState('uni');

  const dispatch = useDispatch();

  const basket = useSelector((state) => state.shoppingCart.basket);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addToBag = () => {
    const item = {
      item: data,
      name: data.attributes.slug,
      qnty: count,
      productSize: size,
      id: data.id,
    };

    const product = basket
      .filter((item) => item.id === data.id)
      .filter((item) => item.productSize === size);

    if (product.length === 0) {
      dispatch(addToBasket([...basket, item]));
    }
    setOpen(true);
  };

  useEffect(() => {
    setData(product.data[0]);
    createPhotoGallery(data?.attributes?.image?.data);

    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, [data, product]);

  const sizeHandleChange = (event, newAlignment) => {
    setSize(newAlignment);
  };

  function createPhotoGallery(data) {
    const gallery = data
      ? data &&
        data.map((item, i) => ({
          src: `http://localhost:1337${item?.attributes?.url}`,
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
            <Link underline="hover" color="inherit" href={`/${data?.attributes?.category}`}>
              {data?.attributes?.category.toUpperCase()}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/${data?.attributes?.category}/${data?.attributes?.productcategory}`}>
              {data?.attributes?.productcategory.toUpperCase()}
            </Link>
          </Breadcrumbs>

          <Box m="20px 0 25px 0">
            <Typography sx={{ mb: '8px', fontSize: '26px' }} variant="h3">
              {data?.attributes?.title}
            </Typography>

            <Divider sx={{ mb: '10px' }} color="yellow" />

            <Typography sx={{ fontSize: '18px', pl: '5px', fontWeight: 'bold' }}>
              ${data?.attributes?.salePrice ? data?.attributes?.salePrice : data?.attributes?.price}
            </Typography>

            <Typography
              sx={{ fontSize: '12px', pl: '5px', color: data?.attributes?.salePrice && 'red' }}>
              {data?.attributes?.salePrice &&
                `Save:
              ${
                data?.attributes?.salePrice &&
                (data?.attributes?.price - data?.attributes?.salePrice).toFixed(2)
              }
              $`}
            </Typography>
            <Divider sx={{ mb: '10px', mt: '10px' }} color="yellow" />
            <ReactMarkdown>{data?.attributes?.description}</ReactMarkdown>
          </Box>
          <Box mb="10px" maxWidth="300px">
            <ToggleButtonGroup
              color="primary"
              value={size}
              exclusive
              onChange={sizeHandleChange}
              aria-label="Platform">
              {data?.attributes?.size?.map((item, index) => {
                return (
                  <ToggleButton
                    key={index}
                    disabled={item.qnty === 0 && true}
                    color="error"
                    value={item.size}>
                    {item.size}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Box>
          {product.meta.length !== 0 && <Box>Available colours</Box>}
          <Box display="flex">
            {product.meta.length !== 0 &&
              product.meta.map((item, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color="inherit"
                  href={`/${item.category}/${item.productcategory}/${item.slug}?title=${item.title}`}>
                  <CardActionArea sx={{ p: '0 15px' }}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={`http://localhost:1337${item.image[0].url}`}
                      alt="Paella dish"
                    />
                  </CardActionArea>
                </Link>
              ))}
          </Box>

          <Divider sx={{ mb: '10px' }} color="yellow" />
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border="1.5px solid black"
              borderRadius="3px"
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
              onClick={addToBag}
              color="error"
              variant="outlined"
              sx={{
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
                borderRadius: '3px',
              }}>
              ADD TO CART
            </Button>
          </Box>
        </Box>
      </Box>

      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        <ReactMarkdown>{data?.attributes?.longDescription}</ReactMarkdown>
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
      <Stack>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Produkts veiksmīgi pievienots iepirkumu grozam!
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default ItemDetails;

export async function getServerSideProps({ params, query }) {
  const { slug, category, productcategory } = params;

  const { title } = query;

  const res = await fetch(
    `${process.env.API_URL}/api/products/${category}/${productcategory}/${slug}?title=${title}`,
  );
  const product = await res.json();

  return { props: { product } };
}
