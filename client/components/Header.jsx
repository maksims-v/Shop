import { useState, useEffect } from 'react';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, IconButton, Badge, Container, TextField } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined, SearchOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MobileSideBarMenu from './MobileSideBarMenu';
import AuthModal from './AuthModal';
import { useSelector, useDispatch } from 'react-redux';
import { unsetToken } from '@/http/authCookie';
import { addToBasket } from '@/state/shoppingCartSlice';

const pages = [
  { id: 1, title: "MEN'S", path: 'mens' },
  { id: 2, title: "WOMEN'S", path: 'womens' },
  { id: 4, title: 'NEW ARRIVALS', path: 'newArrivals' },
  { id: 5, title: 'SALE', path: 'sale' },
  { id: 6, title: 'CLERANCE', path: 'clerance' },
];

const mensCategory = [
  { id: 3, title: 'CLOTHING', path: '/mens/clothing' },
  { id: 4, title: 'FOOTWEAR', path: '/mens/footwear' },
  { id: 5, title: 'ACCESSORIES', path: '/mens/accessories' },
  { id: 6, title: 'ACTIVITY', path: '/mens/activity' },
];

const womensCategory = [
  { id: 3, title: 'CLOTHING', path: '/womens/clothing' },
  { id: 4, title: 'FOOTWEAR', path: '/womens/footwear' },
  { id: 5, title: 'ACCESSORIES', path: '/womens/accessories' },
  { id: 6, title: 'ACTIVITY', path: '/womens/activity' },
];

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const basket = useSelector((state) => state.shoppingCart.basket);

  const dispatch = useDispatch();

  const [id, getId] = useState(null);
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [badgeCount, setBadgeCount] = useState(1);

  const secondBreakPoint = useMediaQuery('(min-width:650px)');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const openMenu = (id) => {
    if (id === 1 || id === 2) {
      getId(id);
    } else {
      getId(null);
    }
  };

  const logout = () => {
    unsetToken();
  };

  useEffect(() => {
    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, []);

  return (
    <>
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
        zIndex="50"
        flexDirection="column"
        flex="0 0 auto">
        <Container
          maxWidth="xl"
          sx={{
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {!secondBreakPoint && (
            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'yellow' }}>
              <MenuIcon fontSize="large" sx={{ color: 'white' }} />
            </IconButton>
          )}
          <Link href="/">
            {' '}
            <Box sx={{ '&:hover': { cursor: 'pointer' }, color: '#ffde00' }}>ADVENTURE</Box>
          </Link>
          <Box display={secondBreakPoint ? 'flex' : 'none'} color="white" gap="20px">
            {pages.map((item) => {
              return (
                <Link href={`/${item.path}`} key={item.path}>
                  <Box
                    sx={{ '&:hover': { cursor: 'pointer', color: '#ffde00' } }}
                    onMouseEnter={() => openMenu(item.id)}>
                    {item.title}
                  </Box>
                </Link>
              );
            })}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            zIndex="2"
            sx={{ position: 'relative' }}>
            <Link href={`/search?search=${searchValue}&pmin=1&pmax=100000`}>
              <IconButton>
                <SearchOutlined sx={{ color: 'white' }} />
              </IconButton>
            </Link>
            <TextField
              onChange={(e) => setSearchValue(e.target.value)}
              id="outlined-search"
              label="Search field"
              type="search"
              sx={{
                position: 'absolute',
                top: '-8px',
                right: '100%',
                width: '200px',
                zIndex: 150,
                backgroundColor: '#edf5fc',
              }}
            />

            {isAuth ? (
              <Box>
                <Link href="/basket">
                  <Badge
                    badgeContent={basket?.length}
                    color="primary"
                    invisible={badgeCount === 0}
                    sx={{
                      '& .MuiBadge-badge': {
                        right: 5,
                        top: 5,
                        padding: '0 4px',
                        height: '14px',
                        minWidth: '13px',
                      },
                    }}>
                    <IconButton sx={{ color: 'white' }}>
                      <ShoppingBagOutlined />
                    </IconButton>
                  </Badge>
                </Link>
                <Link href="/usersdashboard">
                  <IconButton sx={{ color: 'white' }}>
                    <SettingsIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={logout} sx={{ color: 'white' }}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            ) : (
              <Box>
                <Link href="/basket">
                  <Badge
                    badgeContent={basket?.length}
                    color="primary"
                    invisible={badgeCount === 0}
                    sx={{
                      '& .MuiBadge-badge': {
                        right: 5,
                        top: 5,
                        padding: '0 4px',
                        height: '14px',
                        minWidth: '13px',
                      },
                    }}>
                    <IconButton sx={{ color: 'white' }}>
                      <ShoppingBagOutlined />
                    </IconButton>
                  </Badge>
                </Link>
                <IconButton
                  onClick={() => setOpenModalAuth(!openModalAuth)}
                  sx={{
                    color: 'white',
                  }}>
                  <PersonOutline />
                </IconButton>
              </Box>
            )}
          </Box>
        </Container>

        <Box
          position="absolute"
          pr="25px"
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
      <MobileSideBarMenu
        pages={pages}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        mensCategory={mensCategory}
        womensCategory={womensCategory}
      />
      <AuthModal setOpenModalAuth={setOpenModalAuth} openModalAuth={openModalAuth} />
    </>
  );
};

export default Header;
