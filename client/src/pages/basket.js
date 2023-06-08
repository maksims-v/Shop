import { Box, Button, Typography, Divider } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import BasketItem from 'components/BasketItem';
import { addToBasket } from '@/state/shoppingCartSlice';
import { Fragment } from 'react';

const Basket = () => {
  const basket = useSelector((state) => state.shoppingCart.basket);

  const dispatch = useDispatch();

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

  return (
    <Box display="flex" justifyContent="space-around" pt="20px">
      <Box width="40%">
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
        width="30%"
        height="500px"
        bgcolor="#edf5fc"
        p="10px 30px 30px 30px"
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
              <Box display="flex" justifyContent="space-between" p="5px" alignItems="center">
                <Box
                  width="55%"
                  fontSize="11px"
                  sx={{ '&:hover': { cursor: 'pointer', color: 'black' }, color: '#1976d2' }}>
                  <Link href={`/productpage/${item.item.attributes.slug}`}>
                    {item.item.attributes.title}
                  </Link>
                </Box>
                <Box pl="3px" width="15%" textAlign="center" fontWeight="bold">
                  {item.qnty}
                </Box>
                <Box width="15%" textAlign="center" height="100%" fontWeight="bold">
                  {item.productSize.toUpperCase()}
                </Box>
                <Box textAlign="center" width="15%" fontWeight="bold">
                  €{item.item.attributes.price * item.qnty}
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
              const summItem = item.qnty * item.item.attributes.price;
              return summ + summItem;
            }, 0)}
          </Typography>
          <Button variant="outlined" size="large">
            Talak
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Basket;
