import { useRouter } from 'next/router';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Breadcrumbs,
  ToggleButton,
  ToggleButtonGroup,
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
import Layout from 'components/Layout';
import RelatedProductsSlider from 'components/RelatedProductsSlider';
import DoneIcon from '@mui/icons-material/Done';
import { getProductData } from '@/state/productPageSlice';
import ProductPageMobileVersion from 'components/mobileVersionPage/ProductPageMobileVersion';

const ItemDetails = ({ slug, gender, category, subcategory }) => {
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.shoppingCartSlice.basket);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);
  const productData = useSelector((state) => state.productPageSlice.productData);
  const status = useSelector((state) => state.productPageSlice.status);
  const similarProductData = useSelector((state) => state.productPageSlice.similarProductData);

  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [size, setSize] = useState(null);
  const [productQnty, setProductQnty] = useState(null);
  const [changeSizeColor, setChangeSizeColor] = useState('black');

  useEffect(() => {
    dispatch(getProductData(slug));
    setSize(null);
  }, [slug]);

  useEffect(() => {
    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    !size && setProductQnty(null);
    setChangeSizeColor('black');
  }, [size]);

  const addToBag = () => {
    if (size && productQnty !== 0) {
      const item = {
        item: productData,
        name: productData.slug,
        qnty: count,
        productSize: size,
        id: productData.id,
      };

      const product = basket
        .filter((item) => item.id === productData.id)
        .filter((item) => item.productSize === size);

      if (product.length === 0) {
        dispatch(addToBasket([...basket, item]));
      }
      setOpen(true);
    } else if (!size) {
      setChangeSizeColor('red');
    }
  };

  const sizeHandleChange = (event, newAlignment) => {
    setSize(newAlignment);
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const galleryArr = productData?.image?.data
    ? productData?.image?.data?.map((item) => ({
        src: `http://localhost:1337${item?.attributes?.formats?.small?.url}`,
        width: 1,
        height: 1,
      }))
    : [{ src: ``, width: 1, height: 1 }];

  return mobile ? (
    <ProductPageMobileVersion
      product={product}
      gender={gender}
      category={category}
      subcategory={subcategory}
      slug={slug}
      similarProducts={similarProductData}
    />
  ) : (
    <Layout>
      <Box width="100%" m="50px auto 10px auto">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px', mt: '20px' }}>
          <Link underline="hover" color="inherit" href="/">
            HOME
          </Link>
          <Link underline="hover" color="inherit" href={`/${gender}`}>
            {gender.toUpperCase()}
          </Link>
          <Link underline="hover" color="inherit" href={`/${gender}/${category}`}>
            {category.toUpperCase()}
          </Link>
          <Link underline="hover" color="inherit" href={`/${gender}/${category}/${subcategory}`}>
            {subcategory.toUpperCase()}
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
                onClick={() => setViewerIsOpen(true)}
                alt={productData?.name}
                width="100%"
                height="500px"
                src={`http://localhost:1337${productData?.image?.data[currentImage]?.attributes?.url}`}
                style={{ objectFit: 'contain' }}
              />
              <Box>
                <Box width={productData?.image?.data?.length <= 2 ? '40%' : '100%'}>
                  {status == 'resolved' && (
                    <Gallery
                      targetRowHeight={20}
                      thumbnailHeight={50}
                      photos={galleryArr}
                      onClick={openLightbox}
                    />
                  )}
                </Box>
                <ModalGateway>
                  {viewerIsOpen && status == 'resolved' ? (
                    <Modal onClose={closeLightbox}>
                      <ItemCarousel
                        currentIndex={currentImage}
                        views={
                          productData?.image?.data
                            ? productData.image.data?.map((item, i) => ({
                                src: `http://localhost:1337${item?.attributes?.url}`,
                              }))
                            : [{ src: '' }]
                        }
                      />
                    </Modal>
                  ) : null}
                </ModalGateway>
              </Box>
            </Box>
          </Box>

          <Box flex="1 1 45%" mb="40px">
            <Box m="20px 0 25px 0">
              <Typography sx={{ mb: '8px', fontSize: '24px', fontWeight: 'bold' }} variant="h3">
                {productData?.title}
              </Typography>

              <Divider sx={{ mb: '10px' }} color="yellow" />

              <Typography sx={{ fontSize: '38px', fontWeight: 'bold' }}>
                {productData?.price} $
              </Typography>

              <Typography
                sx={{ fontSize: '12px', pl: '5px', color: productData?.oldPrice && 'red' }}>
                {productData?.sale &&
                  `Save:
              ${productData?.sale && (productData?.price - productData?.oldPrice).toFixed(2)}
              $`}
              </Typography>
              <Divider sx={{ mb: '10px', mt: '10px' }} color="yellow" />
              <Box sx={{ fontSize: '15px', fontWeight: 'bold', mb: '10px' }}>
                Choose color:{' '}
                <Typography component="span">
                  {productData?.color && productData.color[0].color}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: '10px' }}>
                {similarProductData &&
                  similarProductData.data?.map((item, index) => (
                    <Link
                      key={item.id}
                      underline="hover"
                      color="inherit"
                      href={`/${item?.attributes?.gender}/${item?.attributes?.category}/${item?.attributes?.subcategory}/${item?.attributes?.slug}`}>
                      <CardActionArea sx={{ p: '0 15px' }}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={`http://localhost:1337${item.attributes.image.data[0].attributes.formats.thumbnail.url}`}
                          alt="Paella dish"
                        />
                      </CardActionArea>
                    </Link>
                  ))}
              </Box>
              <Box
                sx={{ fontSize: '15px', fontWeight: 'bold', mb: '10px', color: changeSizeColor }}>
                Choose size:
                <Box component="span" sx={{ pl: '3px', fontWeight: 'normal' }}>
                  {' '}
                  {size?.toUpperCase()}
                </Box>
                <Box component="span" sx={{ pl: '3px' }}>
                  {}
                  {productQnty > 0 && (
                    <>
                      <DoneIcon fontSize="small" sx={{ color: '#449d44', position: 'absolute' }} />
                      <Box
                        sx={{ fontWeight: 'normal', color: '#449d44', pl: '18px' }}
                        component="span">
                        {' '}
                        In stock!
                      </Box>
                    </>
                  )}
                  {productQnty === 0 && (
                    <Box sx={{ fontWeight: 'normal', color: 'red' }} component="span">
                      {' '}
                      Out of stock!
                    </Box>
                  )}
                </Box>
              </Box>
              <Box mb="10px" maxWidth="300px">
                <ToggleButtonGroup
                  color="primary"
                  value={size}
                  exclusive
                  onChange={sizeHandleChange}
                  aria-label="Platform">
                  {productData?.size?.map((item, index) => {
                    return (
                      <ToggleButton
                        key={index}
                        onClick={() => setProductQnty(item.qnty ? item.qnty : 0)}
                        color={item.qnty === 0 ? 'error' : 'success'}
                        value={item.size}>
                        {item.size}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Box>
              <ReactMarkdown>{productData?.description}</ReactMarkdown>
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
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
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

        <Box display="flex" flexWrap="wrap" gap="15px" mb="50px">
          <ReactMarkdown>{productData?.longDescription}</ReactMarkdown>
        </Box>

        <RelatedProductsSlider
          slug={slug}
          gender={gender}
          category={category}
          subcategory={subcategory}
          id={productData && productData.id}
        />

        <Stack>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
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

export async function getServerSideProps({ params, query }) {
  const { slug, gender, category, subcategory } = params;

  return { props: { slug, gender, category, subcategory } };
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
