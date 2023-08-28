import { useState } from 'react';
import Link from 'next/link';
import { Box, IconButton, Badge, Paper, InputBase, Divider, Container } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthModal from '../AuthModal';
import { useSelector } from 'react-redux';
import { unsetToken } from '@/http/authCookie';
import MobileHeader from '../mobileVersionPage/MobileHeader';
import Image from 'next/image';

const Header = () => {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const basket = useSelector((state) => state.shoppingCartSlice.basket);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);
  const headerFetchData = useSelector((state) => state.headerSlice.data);

  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [subHeaderOpenLink, setSubHeaderOpenLink] = useState([]);
  const [subHeaderMenuOpen, setSubHeaderMenuOpen] = useState(false);

  const openMenu = (listLink) => {
    setSubHeaderOpenLink(listLink);
    setSubHeaderMenuOpen(true);
  };

  const logout = () => {
    unsetToken();
  };

  return mobile ? (
    <MobileHeader />
  ) : (
    <>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          backgroundColor: '#262624',
          position: 'fixed',
          zIndex: '99',
        }}>
        <Container maxWidth="xl" sx={{ height: '100%', width: '100%' }}>
          <Link href="/">
            <Box
              sx={{
                position: 'absolute',
                top: '52%',
                transform: 'translate(0%, -50%)',
              }}>
              <Image alt="logo" src="/logo.png" width={90} height={65} />
            </Box>
          </Link>
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              gap: '20px',
            }}>
            {headerFetchData &&
              headerFetchData.map((item) => {
                return (
                  <Link href={`${item.href}`} key={item.label}>
                    <Box
                      sx={{ '&:hover': { cursor: 'pointer', color: '#ffde00' } }}
                      onMouseEnter={() => openMenu(item.link)}>
                      {item.label}
                    </Box>
                  </Link>
                );
              })}
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                height: '10%%',
                position: 'absolute',
                right: '0%',
                display: 'flex',
                alignItems: 'center',
                height: '60px',
              }}>
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
              <Box>
                <Link href="/basket">
                  <Badge
                    badgeContent={basket?.length}
                    color="primary"
                    invisible={basket?.length === 0}
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

                {isAuth ? (
                  <>
                    <Link href="/userdashboard">
                      <IconButton sx={{ color: 'white' }}>
                        <SettingsIcon />
                      </IconButton>
                    </Link>
                    <IconButton onClick={logout} sx={{ color: 'white' }}>
                      <LogoutIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => setOpenModalAuth(!openModalAuth)}
                    sx={{
                      color: 'white',
                    }}>
                    <PersonOutline />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Container>

        {subHeaderOpenLink.length !== 0 && (
          <Box
            position="absolute"
            pr="25px"
            top="60px"
            height="50px"
            width="100%"
            display={subHeaderMenuOpen ? 'flex' : 'none'}
            justifyContent="center"
            alignItems="center"
            color="black"
            backgroundColor="gray"
            onMouseLeave={() => setSubHeaderMenuOpen(false)}>
            <Box display="flex" gap="20px">
              {subHeaderOpenLink &&
                subHeaderOpenLink.map((item) => {
                  return (
                    <Link key={item.href} href={item.href}>
                      <Box
                        sx={{
                          color: 'white',
                          '&:hover': { cursor: 'pointer', color: '#ffde00' },
                        }}>
                        {item.label}
                      </Box>
                    </Link>
                  );
                })}
            </Box>
          </Box>
        )}
      </Box>

      <AuthModal setOpenModalAuth={setOpenModalAuth} openModalAuth={openModalAuth} />
    </>
  );
};

export default Header;
