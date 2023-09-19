import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, IconButton, Badge, InputBase, Divider, Container } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthModal from './AuthModal';
import { useSelector } from 'react-redux';
import { unsetToken } from '@/lib/auth';
import MobileHeader from './mobileVersionPage/MobileHeader';
import Image from 'next/image';

const Navbar = () => {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const basket = useSelector((state) => state.shoppingCartSlice.basket);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);
  const headerFetchData = useSelector((state) => state.headerSlice.data);

  const router = useRouter();

  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [subHeaderOpenLink, setSubHeaderOpenLink] = useState([]);
  const [subHeaderMenuOpen, setSubHeaderMenuOpen] = useState(false);

  const openMenu = (listLink) => {
    setSubHeaderOpenLink(listLink);
    setSubHeaderMenuOpen(true);
  };

  const logout = () => {
    router.replace('/');
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
          position: 'fixed',
          backgroundColor: '#ebebeb',
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
                  <Link key={item.label} href={`${item.href}`}>
                    <Box
                      sx={{
                        color: 'black',
                        display: 'inline-block',
                        position: 'relative',
                        fontWeight: '600',
                        '&:after': {
                          content: "''",
                          position: 'absolute',
                          width: '100%',
                          transform: 'scaleX(0)',
                          height: '2px',
                          bottom: '0',
                          left: '0',
                          backgroundColor: '#f5b950',
                          transformOrigin: 'bottom right',
                          transition: 'transform 0.25s ease-out',
                        },
                        '&:hover:after': {
                          transform: 'scaleX(1)',
                          transformOrigin: 'bottom left',
                        },
                      }}
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
              <Box
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 200,
                  height: 40,
                  mr: '10px',
                  border: '1px solid #727272',
                  borderRadius: '5px',
                }}>
                <InputBase
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" color="#727272" />
                <Link href={`/search/${searchValue}`}>
                  <IconButton
                    onClick={() => setSearchValue('')}
                    type="button"
                    sx={{ p: '10px', color: '#f5b950' }}
                    aria-label="search">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </Link>
              </Box>
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
                    <IconButton>
                      <ShoppingBagOutlined />
                    </IconButton>
                  </Badge>
                </Link>

                {isAuth ? (
                  <>
                    <Link href="/userdashboard">
                      <IconButton>
                        <SettingsIcon />
                      </IconButton>
                    </Link>

                    <IconButton onClick={logout}>
                      <LogoutIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => setOpenModalAuth(!openModalAuth)} sx={{}}>
                    <PersonOutline />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Container>

        {subHeaderOpenLink.length !== 0 && (
          <>
            <Box
              borderTop="1px solid #aeaeae"
              borderBottom="1px solid #aeaeae"
              position="absolute"
              pr="25px"
              top="60px"
              height="50px"
              width="100%"
              display={subHeaderMenuOpen ? 'flex' : 'none'}
              justifyContent="center"
              alignItems="center"
              color="black"
              backgroundColor="#ebebeb"
              onMouseLeave={() => setSubHeaderMenuOpen(false)}>
              <Box display="flex" gap="20px">
                {subHeaderOpenLink &&
                  subHeaderOpenLink.map((item) => {
                    return (
                      <Link key={item.href} href={`${item.href}`}>
                        <Box
                          sx={{
                            color: 'black',
                            fontWeight: '600',
                            position: 'relative',
                            '&:after': {
                              content: "''",
                              position: 'absolute',
                              width: '100%',
                              transform: 'scaleX(0)',
                              height: '2px',
                              bottom: '0',
                              left: '0',
                              backgroundColor: '#f5b950',
                              transformOrigin: 'bottom right',
                              transition: 'transform 0.25s ease-out',
                            },
                            '&:hover:after': {
                              transform: 'scaleX(1)',
                              transformOrigin: 'bottom left',
                            },
                          }}>
                          {item.label}
                        </Box>
                      </Link>
                    );
                  })}
              </Box>
            </Box>
          </>
        )}
        {/* <Divider color="#aeaeae" /> */}
      </Box>
      <AuthModal setOpenModalAuth={setOpenModalAuth} openModalAuth={openModalAuth} />
    </>
  );
};

export default Navbar;
