import { Box, Container, List, Typography, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import MobileFooter from './mobileVersionPage/MobileFooter';

const Footer = () => {
  const data = useSelector((state) => state.footerSlice.data);
  const status = useSelector((state) => state.footerSlice.status);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  return mobile ? (
    <MobileFooter />
  ) : (
    <Box
      minHeight="300px"
      backgroundColor="#262624"
      color="white"
      pt="40px"
      mt={mobile ? '20px' : '50px'}>
      <Container maxWidth="md" sx={{ height: '100%' }}>
        {status === 'resolved' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="h3">
                {data && data?.supportLinks[0]?.label}
              </Typography>
              <List>
                {data?.supportLinks[0]?.link?.map((item, index) => (
                  <ListItem key={index} sx={{ p: '0px 0px 0px 0px' }}>
                    <Link href={item.href}>{item.label}</Link>
                  </ListItem>
                ))}{' '}
              </List>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="h3">
                {data && data?.aboutLinks[0]?.label}
              </Typography>
              <List>
                {data?.aboutLinks[0]?.link?.map((item, index) => (
                  <ListItem key={index} sx={{ p: '0px 0px 0px 0px' }}>
                    <Link href={item.href}>{item.label}</Link>
                  </ListItem>
                ))}{' '}
              </List>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="h3">
                {data && data?.allProductsLinks[0]?.label}
              </Typography>
              <List>
                {data?.allProductsLinks[0]?.link?.map((item, index) => (
                  <ListItem key={index} sx={{ p: '0px 0px 0px 0px' }}>
                    <Link href={item.href}>{item.label}</Link>
                  </ListItem>
                ))}{' '}
              </List>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="h3">
                {data && data?.socialLinks[0]?.label}
              </Typography>
              <List>
                {data?.socialLinks[0]?.link?.map((item, index) => (
                  <ListItem key={index} sx={{ p: '0px 0px 0px 0px' }}>
                    <Link href={item.href}>{item.label}</Link>
                  </ListItem>
                ))}{' '}
              </List>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
