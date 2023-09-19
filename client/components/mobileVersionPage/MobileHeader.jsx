import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, IconButton, Badge, Paper, InputBase, Divider } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MobileSideBarMenu from 'components/mobileVersionPage/MobileSideBarMenu';
import AuthModal from '../AuthModal';
import { useSelector, useDispatch } from 'react-redux';
import { unsetToken } from '@/lib/auth';
import { addToBasket } from '@/state/shoppingCartSlice';
import Image from 'next/image';

const MobileHeader = () => {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const basket = useSelector((state) => state.shoppingCartSlice.basket);

  const dispatch = useDispatch();

  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [badgeCount, setBadgeCount] = useState(1);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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
            <Image src="/logo.png" alt="logo" width={90} height={65} />
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

      <MobileSideBarMenu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      {openSearchMenu && (
        <Box
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
            borderBottom: '1.5px solid #727272',
          }}>
          <InputBase
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} color="#727272" orientation="vertical" />

          <Link href={`/search/${searchValue}`}>
            <IconButton
              onClick={toggleSearch}
              type="button"
              sx={{ p: '10px', color: '#f5b950' }}
              aria-label="search">
              <SearchIcon />
            </IconButton>
          </Link>
        </Box>
      )}

      <AuthModal setOpenModalAuth={setOpenModalAuth} openModalAuth={openModalAuth} />
    </>
  );
};

export default MobileHeader;
