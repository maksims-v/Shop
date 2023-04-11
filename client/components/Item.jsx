import { IconButton, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import myImage from '../public/4.jpeg';

const Item = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(1);

  return (
    <Box>
      <Box
        position="relative"
        height="400px"
        width="300px"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        sx={{
          background: `url(${myImage.src}) center / 100% no-repeat`,
        }}>
        <Box
          display={isHovered ? 'block' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" backgroundColor="black" borderRadius="3px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color="black">{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button sx={{ backgroundColor: 'black', color: 'white' }}>Add to Cart</Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color="black">
          as
        </Typography>
        <Typography>asd</Typography>
        <Typography fontWeight="bold">$12</Typography>
      </Box>
    </Box>
  );
};

export default Item;

{
  /* <Box width="300px" height="400px" border="1px solid black" position="relative">
<Box
  sx={{
    background: `url(${myImage.src}) center / 100% no-repeat`,
  }}
  height="300px"
  position="relative"
  onMouseOver={() => setIsHovered(true)}
  onMouseOut={() => setIsHovered(false)}>
  {/* <img
    alt="error"
    width="300px"
    height="400px"
    src={`/6.jpg`}
    style={{ cursor: 'pointer' }}
  /> 
</Box>
<Box mt="3px" color="black">
  <Typography variant="subtitle2">asd</Typography>
  <Typography>T-shirt</Typography>
  <Typography fontWeight="bold">$12</Typography>
</Box>
<Box position="absolute" top="10px" width="100%">
  <Button sx={{ backgroundColor: 'black', color: 'white' }}>Add to Cart</Button>
</Box>
</Box> */
}
