import { useState, useEffect } from 'react';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  IconButton,
  Badge,
  Container,
  TextField,
  Paper,
  InputBase,
  Divider,
} from '@mui/material';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MobileSideBarMenu from './MobileSideBarMenu';
import AuthModal from './AuthModal';
import { useSelector, useDispatch } from 'react-redux';
import { unsetToken } from '@/http/authCookie';
import { addToBasket } from '@/state/shoppingCartSlice';
import MobileHeader from './mobileVersion/MobileHeader';

const pages = [
  { id: 1, title: "MEN'S", path: "men's" },
  { id: 2, title: "WOMEN'S", path: "women's " },
  { id: 4, title: 'NEW ARRIVALS', path: 'newArrivals' },
  { id: 5, title: 'SALE', path: 'sale' },
  { id: 6, title: 'CLERANCE', path: 'clerance' },
];

const mensCategory = [
  { id: 3, title: 'CLOTHING', path: "/men's/clothing" },
  { id: 4, title: 'FOOTWEAR', path: "/men's/footwear" },
  { id: 5, title: 'ACCESSORIES', path: "/men's/accessories" },
  { id: 6, title: 'ACTIVITY', path: "/men's/activity" },
];

const womensCategory = [
  { id: 3, title: 'CLOTHING', path: "/women's/clothing" },
  { id: 4, title: 'FOOTWEAR', path: "/women's/footwear" },
  { id: 5, title: 'ACCESSORIES', path: "/women's/accessories" },
  { id: 6, title: 'ACTIVITY', path: "/women's/activity" },
];

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const basket = useSelector((state) => state.shoppingCart.basket);
  const mobile = useSelector((state) => state.search.mobile);

  const dispatch = useDispatch();

  const [id, getId] = useState(null);
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [badgeCount, setBadgeCount] = useState(1);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);

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

  const toggleSearch = () => {
    setOpenSearchMenu(false);
    setSearchValue('');
  };

  useEffect(() => {
    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, []);

  return mobile ? (
    <MobileHeader />
  ) : (
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
          {mobile && (
            <Link href={`/search/${searchValue}`}>
              <IconButton
                onClick={() => setSearchValue('')}
                type="button"
                sx={{}}
                aria-label="search">
                <SearchIcon sx={{ color: 'white' }} />
              </IconButton>
            </Link>
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
            {!mobile && (
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}>
                <InputBase
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Link href={`/search/${searchValue}`}>
                  <IconButton
                    onClick={() => setSearchValue('')}
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Link>
              </Paper>
            )}

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
