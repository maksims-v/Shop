import { useState, useEffect } from 'react';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, IconButton, Badge, Container, TextField, Input } from '@mui/material';
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
  { id: 1, title: "MEN'S", path: '/mens' },
  { id: 2, title: "WOMEN'S", path: '/womens' },
  { id: 3, title: 'KIDS', path: '/kids' },
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

  async function searchFilterItems() {
    const getFilterItems = await fetch(
      `http://localhost:1337/api/products/filter?search=${searchValue}`,
    );

    const response = await getFilterItems.json();
    console.log(response);
  }

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
    if (searchValue !== 0) {
      setTimeout(() => {
        searchFilterItems();
      }, 1000);
    }
  }, [searchValue]);

  useEffect(() => {
    const basket = localStorage.getItem('cart');
    if (basket) dispatch(addToBasket(JSON.parse(basket)));
  }, []);

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
        zIndex="50"
        flexDirection="column">
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
                <Box
                  key={item.id}
                  sx={{ '&:hover': { cursor: 'pointer', color: 'red' } }}
                  onMouseEnter={() => openMenu(item.id)}>
                  {item.title}
                </Box>
              );
            })}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            zIndex="2"
            sx={{ position: 'relative' }}>
            <IconButton onClick={() => searchFilterItems()}>
              <SearchOutlined sx={{ color: 'white' }} />
            </IconButton>

            <TextField
              id="outlined-basic"
              label="Meklet"
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
