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
import { useState, useEffect, forwardRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import { addToBasket } from '@/state/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Layout from 'components/layout/Layout';
import RelatedProductsSlider from 'components/RelatedProductsSlider';
import DoneIcon from '@mui/icons-material/Done';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const responsive = {
  0: { items: 1 },
  600: { items: 2 },
};

const SlugMobileVesrsion = ({ product, gender, category, subcategory, slug }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const [count, setCount] = useState(1);
  const [size, setSize] = useState(null);
  const [productQnty, setProductQnty] = useState(null);
  const [changeSizeColor, setChangeSizeColor] = useState('black');

  const dispatch = useDispatch();

  const basket = useSelector((state) => state.shoppingCart.basket);
  const mobile = useSelector((state) => state.search.mobile);

  useEffect(() => {
    setData(product?.data[0]);

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

  useEffect(() => {
    !size && setProductQnty(null);
    setChangeSizeColor('black');
  }, [size]);

  const addToBag = () => {
    if (size && productQnty !== 0) {
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
    } else if (!size) {
      setChangeSizeColor('red');
    }
  };

  const sizeHandleChange = (event, newAlignment) => {
    setSize(newAlignment);
  };

  return (
    <Layout>
      <Box width="100%" m="0px auto" p="0px 5px">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '10px' }}>
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
        <Box display="flex" flexWrap="wrap">
          <AliceCarousel
            mouseTracking
            disableButtonsControls
            animationDuration={800}
            items={product?.data[0]?.attributes?.image?.data?.map((item) => {
              return (
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src={`${process.env.API_URL}${item?.attributes?.url}`}
                    style={{ width: '90%' }}
                    alt={item.id}
                  />
                </Box>
              );
            })}
            responsive={responsive}
            controlsStrategy="alternate"
          />

          <Box flex="1 1 45%" mb="40px">
            <Box m="20px 0 25px 0">
              <Typography sx={{ mb: '8px', fontSize: '24px', fontWeight: 'bold' }} variant="h3">
                {data?.attributes?.title}
              </Typography>

              <Divider sx={{ mb: '10px' }} color="yellow" />

              <Typography sx={{ fontSize: '38px', fontWeight: 'bold' }}>
                {data?.attributes?.price} $
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
              {product?.meta?.length !== 0 && (
                <Box sx={{ fontSize: '15px', fontWeight: 'bold', mb: '10px' }}>
                  Choose color:{' '}
                  <Typography component="span">{data?.attributes?.color[0]?.color}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', mb: '10px' }}>
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
                  {data?.attributes?.size?.map((item, index) => {
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
              <ReactMarkdown>{data?.attributes?.description}</ReactMarkdown>
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

export default SlugMobileVesrsion;
