import { Fragment } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BasketItem = ({ item, deleteProduct, increase, decrease }) => {
  return (
    <Box>
      <FlexBox p="15px 0 15px 0">
        <Box flex="1 1 40%">
          <Link href={`/productpage/${item.item.attributes.slug}`}>
            <img
              src={
                `http://localhost:1337` +
                item.item.attributes.image.data[0].attributes.formats.small.url
              }
              alt="alt"
              width="150px"
              height="164px"
            />
          </Link>
        </Box>
        <Box flex="1 1 60%">
          <FlexBox mb="10px">
            <Typography fontWeight="bold" color="#1976d2">
              {item.item.attributes.title}
            </Typography>
            <IconButton onClick={() => deleteProduct(item)}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          <Box display="flex">
            <Box display="flex" alignItems="center" border={`1.5px solid black`}>
              <IconButton onClick={() => decrease(item)}>
                <RemoveIcon fontSize="large" />
              </IconButton>
              <Typography>{item.qnty}</Typography>
              <IconButton onClick={() => increase(item)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Box pl="10px" pt="5px">
              <Box pb="0px">
                Cena par vienību:
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  {` €${item.item.attributes.price}`}
                </Box>
              </Box>
              <Box>
                Izmērs:
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  {` ${item.productSize.toUpperCase()}`}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </FlexBox>
      <Divider />
    </Box>
  );
};

export default BasketItem;
