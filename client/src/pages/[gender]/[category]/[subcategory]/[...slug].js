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
import ItemCarousel, { Modal, ModalGateway } from 'react-images';
import Link from 'next/link';
import { addToBasket } from '@/state/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Layout from 'components/layout/Layout';
import RelatedProductsSlider from 'components/RelatedProductsSlider';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemDetails = ({ product, gender, category, subcategory, slug }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [carouselPhotos, setCarouselPhotos] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [size, setSize] = useState(null);

  const dispatch = useDispatch();

  const basket = useSelector((state) => state.shoppingCart.basket);

  useEffect(() => {
    setData(product.data[0]);
    createPhotoGallery(data?.attributes?.image?.data);

    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, [data, product]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setSize(null);
  }, [slug]);

  const addToBag = () => {
    if (size) {
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
    }
  };

  const sizeHandleChange = (event, newAlignment) => {
    setSize(newAlignment);
  };

  function createPhotoGallery(data) {
    const carouselData = data
      ? data.map((item, i) => ({
          src: `http://localhost:1337${item?.attributes?.url}`,
          width: 1,
          height: 1,
        }))
      : [];
    setCarouselPhotos(carouselData);

    const galleryPhotos = data
      ? data.map((item) => ({
          src: `http://localhost:1337${item?.attributes?.formats?.small?.url}`,
          width: 1,
          height: 1,
        }))
      : [];
    setGalleryPhotos(galleryPhotos);
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
    <Layout>
      <Box width="100%" m="10px auto">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            HOME
          </Link>
          <Link underline="hover" color="inherit" href={`/${data?.attributes?.gender}`}>
            {data?.attributes?.gender.toUpperCase()}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/${data?.attributes?.gender}/${data?.attributes?.category}`}>
            {data?.attributes?.category.toUpperCase()}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/${data?.attributes?.gender}/${data?.attributes?.category}/${data?.attributes?.subcategory}`}>
            {data?.attributes?.subcategory.toUpperCase()}
          </Link>
        </Breadcrumbs>
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
                {galleryPhotos.length !== 1 && (
                  <Box width={galleryPhotos.length <= 2 ? '40%' : '100%'}>
                    <Gallery
                      targetRowHeight={20}
                      thumbnailHeight={50}
                      photos={galleryPhotos}
                      onClick={openLightbox}
                    />
                  </Box>
                )}

                <ModalGateway>
                  {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                      <ItemCarousel
                        currentIndex={currentImage}
                        views={carouselPhotos.map((x) => ({
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
            <Box m="20px 0 25px 0">
              <Typography sx={{ mb: '8px', fontSize: '26px' }} variant="h3">
                {data?.attributes?.title}
              </Typography>

              <Divider sx={{ mb: '10px' }} color="yellow" />

              <Typography sx={{ fontSize: '18px', pl: '5px', fontWeight: 'bold' }}>
                ${data?.attributes?.sale ? data?.attributes?.oldPrice : data?.attributes?.price}
              </Typography>

              <Typography
                sx={{ fontSize: '12px', pl: '5px', color: data?.attributes?.oldPrice && 'red' }}>
                {data?.attributes?.sale &&
                  `Save:
              ${
                data?.attributes?.sale &&
                (data?.attributes?.price - data?.attributes?.oldPrice).toFixed(2)
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
            {product?.meta?.length !== 0 && <Box>Available colours</Box>}
            <Box display="flex">
              {product?.meta?.length !== 0 &&
                product.meta.map((item, index) => (
                  <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    href={`/${item.gender}/${item.category}/${item.subcategory}/${item.slug}`}>
                    <CardActionArea sx={{ p: '0 15px' }}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={`http://localhost:1337${item?.image[0]?.formats?.thumbnail?.url}`}
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

        <RelatedProductsSlider
          slug={slug}
          gender={gender}
          category={category}
          subcategory={subcategory}
          id={product?.data[0].id}
        />

        <Stack>
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Produkts veiksmīgi pievienots iepirkumu grozam!
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </Layout>
  );
};

export default ItemDetails;

export async function getServerSideProps({ params }) {
  const { slug, gender, category, subcategory } = params;

  const res = await fetch(
    `${process.env.API_URL}/api/products/${gender}/${category}/${subcategory}/${slug}`,
  );
  const product = await res.json();

  return { props: { product, gender, category, subcategory, slug } };
}
