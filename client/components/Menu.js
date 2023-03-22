import {
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from '@mui/material';
import React from 'react';

const Menu = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Menu;
