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

const ProductPageMobileVersion = ({
  productData,
  similarProductData,
  pageCategory,
  category,
  subcategory,
  slug,
}) => {
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);

  const [data, setData] = useState([]);

  const [count, setCount] = useState(1);
  const [size, setSize] = useState(null);
  const [productQnty, setProductQnty] = useState(null);
  const [changeSizeColor, setChangeSizeColor] = useState('black');

  const dispatch = useDispatch();

  const basket = useSelector((state) => state.shoppingCartSlice.basket);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  useEffect(() => {
    setData(productData);

    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, [data, productData]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setError(false);
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
        item: productData.attributes,
        name: productData.attributes.slug,
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
      setError(true);
      setChangeSizeColor('red');
    }
  };

  const sizeHandleChange = (event, newAlignment) => {
    setSize(newAlignment);
  };

  return (
    <Box width="100%" m="0px auto" p="0px 7px">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '20px', mt: '20px' }}>
        <Link underline="hover" color="inherit" href="/">
          <Box>HOME</Box>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/shop/${productData?.attributes?.pageCategory}`}>
          <Box> {pageCategory.toUpperCase()}</Box>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/shop/${productData?.attributes?.pageCategory}/${
            (productData?.attributes?.equipmentCategory !== 'null' &&
              productData?.attributes?.equipmentCategory) ||
            (productData?.attributes?.category !== 'null' && productData?.attributes?.category)
          }`}>
          <Box>{category.toUpperCase()}</Box>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/shop/${productData?.attributes?.pageCategory}/${
            (productData?.attributes?.equipmentCategory !== 'null' &&
              productData?.attributes?.equipmentCategory) ||
            (productData?.attributes?.category !== 'null' && productData?.attributes?.category)
          }/${
            (productData?.attributes?.toolsGearCategory !== 'null' &&
              productData?.attributes?.toolsGearCategory) ||
            (productData?.attributes?.campSleepCategory !== 'null' &&
              productData?.attributes?.campSleepCategory) ||
            (productData?.attributes?.lampsLanternsCategory !== 'null' &&
              productData?.attributes?.lampsLanternsCategory) ||
            (productData?.attributes?.otherCategory !== 'null' &&
              productData?.attributes?.otherCategory) ||
            (productData?.attributes?.footwearCategory !== 'null' &&
              productData?.attributes?.footwearCategory) ||
            (productData?.attributes?.clothingCategory !== 'null' &&
              productData?.attributes?.clothingCategory) ||
            (productData?.attributes?.activityCategory !== 'null' &&
              productData?.attributes?.activityCategory) ||
            (productData?.attributes?.accessoriesCategory !== 'null' &&
              productData?.attributes?.accessoriesCategory)
          }`}>
          <Box>{subcategory.toUpperCase()}</Box>
        </Link>
      </Breadcrumbs>
      <Box display="flex" flexWrap="wrap">
        <AliceCarousel
          mouseTracking
          disableButtonsControls
          animationDuration={800}
          items={productData?.attributes?.image?.data?.map((item) => {
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
            <Typography sx={{ fontSize: '16px' }} variant="h2">
              {data?.attributes?.brand}
            </Typography>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }} variant="h3">
              {data?.attributes?.title}
            </Typography>
            <Typography sx={{ fontSize: '28px', fontWeight: 'bold' }}>
              {data?.attributes?.price} $
            </Typography>
            <Typography
              sx={{ fontSize: '12px', pl: '5px', color: data?.attributes?.oldPrice && 'red' }}>
              {data?.attributes?.sale &&
                `Save:${
                  data?.attributes?.sale &&
                  (data?.attributes?.price - data?.attributes?.oldPrice).toFixed(2)
                }$`}
            </Typography>
            <Box sx={{ fontSize: '15px', fontWeight: 'bold', mb: '10px' }}>
              Choose color:{' '}
              <Typography component="span">{productData?.attributes?.color?.color}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: '10px' }}>
              {similarProductData &&
                similarProductData.data?.map((item, index) => (
                  <Link
                    key={item.id}
                    underline="hover"
                    color="inherit"
                    href={`/shop/${item?.attributes?.pageCategory}/${
                      (item?.attributes?.category !== 'null' && item?.attributes?.category) ||
                      (item?.attributes?.equipmentCategory !== 'null' &&
                        item?.attributes?.equipmentCategory)
                    }/${
                      (item?.attributes?.toolsGearCategory !== 'null' &&
                        item?.attributes?.toolsGearCategory) ||
                      (item?.attributes?.campSleepCategory !== 'null' &&
                        item?.attributes?.campSleepCategory) ||
                      (item?.attributes?.lampsLanternsCategory !== 'null' &&
                        item?.attributes?.lampsLanternsCategory) ||
                      (item?.attributes?.footwearCategory !== 'null' &&
                        item?.attributes?.footwearCategory) ||
                      (item?.attributes?.clothingCategory !== 'null' &&
                        item?.attributes?.clothingCategory) ||
                      (item?.attributes?.otherCategory !== 'null' &&
                        item?.attributes?.otherCategory) ||
                      (item?.attributes?.activityCategory !== 'null' &&
                        item?.attributes?.activityCategory) ||
                      (item?.attributes?.accessoriesCategory !== 'null' &&
                        item?.attributes?.accessoriesCategory)
                    }/${item?.attributes?.slug}`}>
                    <CardActionArea sx={{ p: '0 2px' }}>
                      <CardMedia
                        component="img"
                        height="60"
                        image={`http://localhost:1337${item.attributes.image.data[0].attributes.formats.thumbnail.url}`}
                        alt="Paella dish"
                      />
                    </CardActionArea>
                  </Link>
                ))}
            </Box>
            <Box sx={{ fontSize: '15px', fontWeight: 'bold', mb: '10px', color: changeSizeColor }}>
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

            <Box maxWidth="300px">
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
            {productQnty <= 5 ? (
              <Box
                sx={{
                  display: productQnty === null ? 'none' : 'block',
                  color: '#f07186',
                }}>
                Only {productQnty} units left
              </Box>
            ) : (
              <Box
                sx={{
                  display: productQnty === null ? 'none' : 'block',
                  color: '#5cb85b',
                }}>
                In stock {productQnty} units
              </Box>
            )}
            <Box display="flex" alignItems="center" mt="10px" minHeight="50px">
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
            <ReactMarkdown>{data?.attributes?.description}</ReactMarkdown>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="15px" mb="50px">
        <ReactMarkdown>{data?.attributes?.longDescription}</ReactMarkdown>
      </Box>

      <RelatedProductsSlider
        slug={slug}
        pageCategory={pageCategory}
        category={category}
        subcategory={subcategory}
        id={data.id}
      />

      <Stack>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            The product has been placed in the cart
          </Alert>
        </Snackbar>
      </Stack>

      <Stack>
        <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please choose the size.
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default ProductPageMobileVersion;
