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
            href={`/shop/${item?.item?.pageCategory}/${
              (item?.item?.category !== 'null' && item?.item?.category) ||
              (item?.item?.equipmentCategory !== 'null' && item?.item?.equipmentCategory)
            }/${
              (item?.item?.campSleepCategory !== 'null' && item?.item?.campSleepCategory) ||
              (item?.item?.lampsLanternsCategory !== 'null' && item?.item?.lampsLanternsCategory) ||
              (item?.toolsGearCategory !== 'null' && item?.toolsGearCategory) ||
              (item?.item?.footwearCategory !== 'null' && item?.item?.footwearCategory) ||
              (item?.item?.clothingCategory !== 'null' && item?.item?.clothingCategory) ||
              (item?.item?.otherCategory !== 'null' && item?.item?.otherCategory) ||
              (item?.item?.activityCategory !== 'null' && item?.item?.activityCategory) ||
              (item?.item?.accessoriesCategory !== 'null' && item?.item?.accessoriesCategory)
            }/${item?.item?.slug}`}>
            <img
              src={`http://localhost:1337` + item.item.image.data[0].attributes.formats.small.url}
              alt="alt"
              width="150px"
              height="164px"
            />
          </Link>
        </Box>
        <Box flex="1 1 60%">
          <FlexBox mb="10px">
            <Link
              href={`/shop/${item?.item?.pageCategory}/${
                (item?.item?.category !== 'null' && item?.item?.category) ||
                (item?.item?.equipmentCategory !== 'null' && item?.item?.equipmentCategory)
              }/${
                (item?.item?.campSleepCategory !== 'null' && item?.item?.campSleepCategory) ||
                (item?.item?.lampsLanternsCategory !== 'null' &&
                  item?.item?.lampsLanternsCategory) ||
                (item?.toolsGearCategory !== 'null' && item?.toolsGearCategory) ||
                (item?.item?.footwearCategory !== 'null' && item?.item?.footwearCategory) ||
                (item?.item?.clothingCategory !== 'null' && item?.item?.clothingCategory) ||
                (item?.item?.otherCategory !== 'null' && item?.item?.otherCategory) ||
                (item?.item?.activityCategory !== 'null' && item?.item?.activityCategory) ||
                (item?.item?.accessoriesCategory !== 'null' && item?.item?.accessoriesCategory)
              }/${item?.item?.slug}`}>
              <Typography
                sx={{
                  '&:hover': { cursor: 'pointer', color: 'black' },
                  color: '#1976d2',
                  fontWeight: 'bold',
                }}>
                {item.item.title}
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
                <Box>Price: </Box>

                <Box display="flex" flexDirection="column" pl="5px">
                  {item.item.sale ? (
                    <>
                      <Box
                        fontWeight="bold"
                        color="red"
                        lineHeight="13px">{` €${item.item.price}`}</Box>
                      <Box
                        sx={{
                          textDecorationLine: 'line-through',
                          fontSize: '11px',
                        }}>{` €${item.item.oldPrice}`}</Box>
                    </>
                  ) : (
                    <Box fontWeight="bold">{` €${item.item.price}`}</Box>
                  )}
                </Box>
              </Box>
              <Box>
                Size:
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
