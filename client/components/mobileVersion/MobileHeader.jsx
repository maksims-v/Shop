import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, IconButton, Badge, Paper, InputBase, Divider } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MobileSideBarMenu from 'components/mobileVersion/MobileSideBarMenu';
import AuthModal from '../AuthModal';
import { useSelector, useDispatch } from 'react-redux';
import { unsetToken } from '@/http/authCookie';
import { addToBasket } from '@/state/shoppingCartSlice';
import Image from 'next/image';

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

const MobileHeader = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const basket = useSelector((state) => state.shoppingCart.basket);

  const dispatch = useDispatch();

  const [id, getId] = useState(null);
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [badgeCount, setBadgeCount] = useState(1);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);

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

  return (
    <>
      <Box
        display="flex"
        width="100%"
        height="50px"
        position="fixed"
        top="0"
        left="0"
        zIndex="50"
        flexDirection="column"
        flex="0 0 auto"
        backgroundColor="white"
        borderBottom="1px solid black">
        <Link href="/">
          {' '}
          <Box
            sx={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: 'translate(-50%, -46%)',
            }}>
            <Image src="/logo2.png" width={90} height={65} />
          </Box>
        </Link>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box>
            <IconButton sx={{ color: 'black' }} onClick={() => setMobileOpen(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>

            <IconButton
              onClick={() => setOpenSearchMenu(!openSearchMenu)}
              sx={{ color: 'black', p: '8px 0px' }}
              type="button"
              aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>

          <Box>
            <Box>
              <Link href="/basket">
                <Badge
                  badgeContent={basket?.length}
                  color="primary"
                  invisible={badgeCount === 0}
                  sx={{
                    '& .MuiBadge-badge': {
                      top: 6,
                      padding: '0 4px',
                      height: '14px',
                      minWidth: '13px',
                    },
                  }}>
                  <IconButton sx={{ color: 'black', p: '8px 0px' }}>
                    <ShoppingBagOutlined />
                  </IconButton>
                </Badge>
              </Link>
              {isAuth ? (
                <>
                  <Link href="/usersdashboard">
                    <IconButton sx={{ color: 'black' }}>
                      <SettingsIcon />
                    </IconButton>
                  </Link>
                  <IconButton onClick={logout} sx={{ color: 'black', p: '8px 8px 8px 0px' }}>
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  onClick={() => setOpenModalAuth(!openModalAuth)}
                  sx={{
                    color: 'black',
                  }}>
                  <PersonOutline />
                </IconButton>
              )}
            </Box>
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
      {openSearchMenu && (
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            position: 'fixed',
            top: 50,
            left: '50%',
            transform: 'translate( -50%)',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            zIndex: '50',
            width: '102%',
          }}>
          <InputBase
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Link href={`/search/${searchValue}`}>
            <IconButton onClick={toggleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Link>
        </Paper>
      )}

      <AuthModal setOpenModalAuth={setOpenModalAuth} openModalAuth={openModalAuth} />
    </>
  );
};

export default MobileHeader;
