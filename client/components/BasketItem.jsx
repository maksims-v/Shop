import { useState, Fragment } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BasketItem = ({ item, deleteProduct, increase, decrease }) => {
  const [count, setCount] = useState(item.qnty);

  return (
    <div>
      <Fragment>
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
              <IconButton onClick={() => deleteProduct(item)}>
                <CloseIcon />
              </IconButton>
            </FlexBox>
            <Typography>agf</Typography>
            <FlexBox m="15px 0">
              <Box display="flex" alignItems="center" border={`1.5px solid black`}>
                <IconButton onClick={() => decrease(item)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.qnty}</Typography>
                <IconButton onClick={() => increase(item)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography fontWeight="bold">$ 15</Typography>
              <Typography fontWeight="bold">{item.productSize}</Typography>
            </FlexBox>
          </Box>
        </FlexBox>
        <Divider />
      </Fragment>
    </div>
  );
};

export default BasketItem;
