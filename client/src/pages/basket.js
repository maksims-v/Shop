import { useState, useEffect } from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Basket = () => {
  const basket = useSelector((state) => state.shoppingCart.basket);

  console.log(basket);

  return (
    <Box width="40%">
      {basket.map((item) => {
        return (
          <>
            <FlexBox p="15px 0">
              <Box flex="1 1 40%">
                <img
                  src={
                    `http://localhost:1337` +
                    item.item.attributes.image.data[0].attributes.formats.small.url
                  }
                  alt="alt"
                  width="150px"
                  height="164px"
                />
              </Box>
              <Box flex="1 1 60%">
                <FlexBox mb="5px">
                  <Typography fontWeight="bold">{item.item.attributes.title}</Typography>
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
                    <Typography>{item.qnty}</Typography>
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography fontWeight="bold">$ 15</Typography>
                </FlexBox>
              </Box>
            </FlexBox>
            <Divider />
          </>
        );
      })}
    </Box>
  );
};

export default Basket;
