import { useState } from 'react';
import { Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import BasketItem from 'components/BasketItem';
import { addToBasket } from '@/state/shoppingCartSlice';

const Basket = () => {
  const basket = useSelector((state) => state.shoppingCart.basket);

  const dispatch = useDispatch();
  const [newBasket, setNewBasket] = useState(basket);

  const deleteProduct = (item) => {
    dispatch(addToBasket(newBasket.filter((product) => product !== item)));
  };

  const increase = (item) => {
    setNewBasket(
      newBasket.map((product) => {
        if (product.id === item.id && product.productSize === item.productSize) {
          console.log('hai');
          return {
            ...product,
            qnty: product.qnty + 1,
          };
        }
        return product;
      }),
    );
  };

  const decrease = (item) => {
    setNewBasket(
      newBasket.map((product) => {
        if (product.id === item.id && product.productSize === item.productSize) {
          const newCount = product.qnty - 1 > 1 ? product.qnty - 1 : 1;

          return {
            ...product,
            qnty: newCount,
          };
        }
        return product;
      }),
    );
  };

  dispatch(addToBasket(newBasket));

  return (
    <Box width="40%">
      {newBasket.map((item, index) => (
        <BasketItem
          item={item}
          key={index}
          deleteProduct={deleteProduct}
          increase={increase}
          decrease={decrease}
        />
      ))}
    </Box>
  );
};

export default Basket;
