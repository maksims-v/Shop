import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, IconButton, Badge, MenuItem, Menu, InputBase } from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { useState } from 'react';
import SideBarMenu from './SideBarMenu';
import LoginModal from './LoginModal';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../src/state/authSlice';

const pages = [
  { id: 1, title: "MEN'S", path: '/mens' },
  { id: 2, title: "WOMEN'S", path: '/womens' },
  { id: 3, title: 'KIDS', path: 'kids' },
  { id: 4, title: 'BRANDS', path: 'brands' },
  { id: 5, title: 'SALE', path: 'sale' },
  { id: 6, title: 'CLERANCE', path: 'clerance' },
];

const mensCategory = [
  { id: 1, title: 'FEATURED', path: '/mens/featured' },
  { id: 2, title: 'COLLECTIONS', path: '/mens/collections' },
  { id: 3, title: 'CLOTHING', path: '/mens/clothing' },
  { id: 4, title: 'FOOTWEAR', path: '/mens/footwear' },
  { id: 5, title: 'ACCESSORIES', path: '/mens/accessories' },
  { id: 6, title: 'ACTIVITY', path: '/mens/activity' },
  { id: 7, title: 'TECHNOLOGY', path: '/mens/technology' },
];

const womensCategory = [
  { id: 1, title: 'FEATURED', path: '/womens/featured' },
  { id: 2, title: 'COLLECTIONS', path: '/womens/collections' },
  { id: 3, title: 'CLOTHING', path: '/womens/clothing' },
  { id: 4, title: 'FOOTWEAR', path: '/womens/footwear' },
  { id: 5, title: 'ACCESSORIES', path: '/womens/accessories' },
  { id: 6, title: 'ACTIVITY', path: '/womens/activity' },
  { id: 7, title: 'TECHNOLOGY', path: '/womens/technology' },
];

const Navbar = () => {
  const [id, getId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const disppatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const firstBreakPoint = useMediaQuery('(min-width:800px)');
  const secondBreakPoint = useMediaQuery('(min-width:650px)');

  const search = () => {
    console.log(searchValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openMenu = (id) => {
    if (id === 1 || id === 2) {
      getId(id);
    } else {
      getId(null);
    }
  };

  return (
    <>
      {' '}
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="#262624"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="5"
        flexDirection="column">
        <Box
          width={firstBreakPoint ? '80%' : '95%'}
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Link href="/">
            {' '}
            <Box sx={{ '&:hover': { cursor: 'pointer' }, color: '#ffde00' }}>ADVENTURE</Box>
          </Link>
          <Box display={secondBreakPoint ? 'flex' : 'none'} color="white" gap="20px">
            {pages.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{ '&:hover': { cursor: 'pointer', color: 'red' } }}
                  onMouseEnter={() => openMenu(item.id)}>
                  {item.title}
                </Box>
              );
            })}
          </Box>
          <Box display="flex" justifyContent="space-between" columnGap="5px" zIndex="2">
            <Box
              backgroundColor="inherit"
              border="1px solid white"
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem">
              <InputBase
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                sx={{ color: 'white' }}
              />
              <IconButton>
                <SearchOutlined onClick={search} sx={{ color: 'white' }} />
              </IconButton>
            </Box>
            <Badge
              badgeContent={1}
              color="secondary"
              invisible={0}
              sx={{
                '& .MuiBadge-badge': {
                  right: 5,
                  top: 5,
                  padding: '0 4px',
                  height: '14px',
                  minWidth: '13px',
                },
              }}>
              <IconButton>
                <ShoppingBagOutlined sx={{ color: 'white' }} />
              </IconButton>
            </Badge>
            <IconButton sx={{ color: 'white' }} onClick={handleClickOpen}>
              {/* <PersonOutline /> */}
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <PersonOutline variant="contained" {...bindTrigger(popupState)} />
                    <Menu
                      {...bindMenu(popupState)}
                      sx={{ mt: '23px', display: isAuth ? 'block' : 'none' }}>
                      <Link href="/myaccount">
                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                      </Link>
                      <MenuItem onClick={() => disppatch(logIn())}>Logout</MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>
            </IconButton>
            <IconButton
              sx={{ color: 'white', display: secondBreakPoint ? 'none' : 'block' }}
              onClick={handleDrawerToggle}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>

        <Box
          position="absolute"
          top="60px"
          height="50px"
          width="100%"
          display={id === null ? 'none' : 'flex'}
          justifyContent="center"
          alignItems="center"
          color="black"
          backgroundColor="gray"
          onMouseLeave={() => getId(null)}>
          <Box display="flex" gap="20px">
            {id === 1
              ? mensCategory.map((item) => {
                  return (
                    <Link key={item.id} href={item.path}>
                      <Box
                        sx={{ color: 'white', '&:hover': { cursor: 'pointer', color: '#ffde00' } }}>
                        {item.title}
                      </Box>
                    </Link>
                  );
                })
              : null}
            {id === 2
              ? womensCategory.map((item) => {
                  return (
                    <Link key={item.id} href={item.path}>
                      <Box
                        sx={{ color: 'white', '&:hover': { cursor: 'pointer', color: '#ffde00' } }}>
                        {item.title}
                      </Box>
                    </Link>
                  );
                })
              : null}
          </Box>
        </Box>
      </Box>
      <SideBarMenu pages={pages} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      {!isAuth && <LoginModal handleClose={handleClose} open={open} />}
    </>
  );
};

export default Navbar;
