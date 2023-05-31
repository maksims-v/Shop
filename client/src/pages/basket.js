import { useState, useEffect } from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Basket = () => {
  const [cart, setCart] = useState([]);

  async function getCart() {
    const res = await fetch(`${process.env.API_URL}/api/products/${slug}?populate=*`);
    const product = await res.json();

    return { props: { product } };
  }
  const getShoppingList = async () => {
    const item = JSON.parse(localStorage.getItem('cart'));
    const res = await fetch(`${process.env.API_URL}/api/products/${item?.item}?populate=*`);
    const product = await res.json();
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('id')));
    getShoppingList();
  }, []);

  return (
    <Box width="40%">
      <FlexBox p="15px 0">
        <Box flex="1 1 40%">
          <img alt="alt" width="123px" height="164px" src="" />
        </Box>
        <Box flex="1 1 60%">
          <FlexBox mb="5px">
            <Typography fontWeight="bold">asdas</Typography>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </FlexBox>
          <Typography>agf</Typography>
          <FlexBox m="15px 0">
            <Box display="flex" alignItems="center" border={`1.5px solid black`}>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <Typography>1</Typography>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Box>
            <Typography fontWeight="bold">$ 15</Typography>
          </FlexBox>
        </Box>
      </FlexBox>
      <Divider />
    </Box>
  );
};

export default Basket;
