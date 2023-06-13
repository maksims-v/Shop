import { Box, Button, Typography, Divider, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import BasketItem from 'components/BasketItem';
import { addToBasket, basketReset } from '@/state/shoppingCartSlice';
import { Fragment } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

const Basket = () => {
  const basket = useSelector((state) => state.shoppingCart.basket);

  const dispatch = useDispatch();

  const largeScreen = useMediaQuery('(min-width:1200px)');
  const mediumScreen = useMediaQuery('(min-width:900px)');

  const deleteProduct = (item) => {
    dispatch(addToBasket(basket.filter((product) => product !== item)));
  };

  const increase = (item) => {
    dispatch(
      addToBasket(
        basket.map((product) => {
          if (product.id === item.id && product.productSize === item.productSize) {
            return {
              ...product,
              qnty: product.qnty + 1,
            };
          }
          return product;
        }),
      ),
    );
  };

  const decrease = (item) => {
    dispatch(
      addToBasket(
        basket.map((product) => {
          if (product.id === item.id && product.productSize === item.productSize) {
            const newCount = product.qnty - 1 > 1 ? product.qnty - 1 : 1;

            return {
              ...product,
              qnty: newCount,
            };
          }
          return product;
        }),
      ),
    );
  };

  const cleanBasket = () => {
    dispatch(basketReset());
  };

  return (
    <Box
      display="flex"
      justifyContent={largeScreen ? 'space-around' : mediumScreen ? 'space-between' : 'center'}
      p={largeScreen ? '20px 0px' : '10px 20px'}
      width="100%">
      <Box width="40%" minWidth="415px" display={mediumScreen ? 'block' : 'none'}>
        {basket.map((item, index) => (
          <BasketItem
            item={item}
            key={index}
            deleteProduct={deleteProduct}
            increase={increase}
            decrease={decrease}
          />
        ))}
      </Box>
      <Box
        width={mediumScreen ? '30%' : '60%'}
        minWidth="350px"
        minHeight="200px"
        bgcolor="#edf5fc"
        p="10px 10px 30px 10px"
        mt="10px"
        display="flex"
        flexDirection="column"
        textAlign="left"
        borderRadius="5px">
        <Typography fontWeight="bold" fontSize="16px" textAlign="center" pb="10px">
          Groza saturs:
        </Typography>
        <Box flexGrow="1" mb="10px">
          <Box display="flex" justifyContent="space-between" p="5px" borderBottom="1px solid black">
            <Box width="55%" fontWeight="bold">
              Nosaukums
            </Box>
            <Box pl="3px" width="15%" textAlign="center" fontWeight="bold">
              Skaits:
            </Box>
            <Box width="15%" textAlign="center" fontWeight="bold">
              Izmērs:
            </Box>
            <Box width="15%" textAlign="center" fontWeight="bold">
              Summa:
            </Box>
          </Box>
          {basket.map((item, index) => (
            <Fragment key={index}>
              <Box
                display="flex"
                justifyContent="space-between"
                p="5px 5px 5px 0px"
                alignItems="center">
                <IconButton sx={{ p: '0px 5px 0px 0px' }} onClick={() => deleteProduct(item)}>
                  <CloseIcon />
                </IconButton>
                {mediumScreen ? null : (
                  <Link href={`/productpage/${item.item.attributes.slug}`}>
                    <img
                      src={
                        `http://localhost:1337` +
                        item.item.attributes.image.data[0].attributes.formats.small.url
                      }
                      alt="alt"
                      width="70px"
                      height="84px"
                    />
                  </Link>
                )}
                <Box
                  width="55%"
                  fontSize="11px"
                  ml={mediumScreen ? '0px' : '10px'}
                  sx={{ '&:hover': { cursor: 'pointer', color: 'black' }, color: '#1976d2' }}>
                  <Link href={`/productpage/${item.item.attributes.slug}`}>
                    {item.item.attributes.title}
                  </Link>
                </Box>
                <Box pl="3px" width="15%" textAlign="center" fontWeight="bold" display="flex">
                  <IconButton sx={{ p: '0px 5px 0px 0px' }} onClick={() => decrease(item)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  {item.qnty}
                  <IconButton sx={{ p: '0px 0px 0px 5px' }} onClick={() => increase(item)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box width="15%" textAlign="center" height="100%" fontWeight="bold">
                  {item.productSize.toUpperCase()}
                </Box>
                <Box textAlign="center" width="15%" fontWeight="bold">
                  €
                  {item.item.attributes.salePrice
                    ? item.item.attributes.salePrice * item.qnty
                    : item.item.attributes.price * item.qnty}
                </Box>
              </Box>
              <Divider />
            </Fragment>
          ))}
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography fontSize="16px" fontWeight="bold">
            Kopā: €
            {basket.reduce(function (summ, item) {
              const summItem = item.item.attributes.sale
                ? item.qnty * item.item.attributes.salePrice
                : item.qnty * item.item.attributes.price;
              return summ + summItem;
            }, 0)}
          </Typography>
          <Button onClick={cleanBasket} variant="outlined" color="error" size="large">
            Dzest grozu
          </Button>
          <Button variant="outlined" size="large">
            Talak
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Basket;
