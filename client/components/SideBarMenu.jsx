import { Box, Drawer, Typography, Divider } from '@mui/material';
import Link from 'next/link';

const SideBarMenu = ({ pages, mobileOpen, handleDrawerToggle }) => {
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}>
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            ADVENTURE
          </Typography>
          <Divider />
          <Box>
            {pages.map((item) => {
              return (
                <Link key={item.id} href={item.path}>
                  <Box sx={{ '&:hover': { cursor: 'pointer', color: 'red' } }}>{item.title}</Box>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBarMenu;
