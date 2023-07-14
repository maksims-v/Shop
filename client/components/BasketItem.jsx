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
          <Link
            href={`/${item.item.attributes.category}/${item.item.attributes.productcategory}/${item.item.attributes.slug}?title=${item.item.attributes.title}`}>
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
            <Link
              href={`/${item.item.attributes.category}/${item.item.attributes.productcategory}/${item.item.attributes.slug}?title=${item.item.attributes.title}`}>
              <Typography
                sx={{
                  '&:hover': { cursor: 'pointer', color: 'black' },
                  color: '#1976d2',
                  fontWeight: 'bold',
                }}>
                {item.item.attributes.title}
              </Typography>
            </Link>

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
              <Box pb="0px" display="flex" alignItems="center">
                <Box>Cena par vienību: </Box>

                <Box display="flex" flexDirection="column" pl="5px">
                  {item.item.attributes.sale ? (
                    <>
                      <Box
                        fontWeight="bold"
                        color="red"
                        lineHeight="13px">{` €${item.item.attributes.salePrice}`}</Box>
                      <Box
                        sx={{
                          textDecorationLine: 'line-through',
                          fontSize: '10px',
                        }}>{` €${item.item.attributes.price}`}</Box>
                    </>
                  ) : (
                    <Box fontWeight="bold">{` €${item.item.attributes.price}`}</Box>
                  )}
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
