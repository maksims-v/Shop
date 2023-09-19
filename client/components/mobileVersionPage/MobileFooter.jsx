import { Box, Container, List, Typography, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const MobileFooter = () => {
  const data = useSelector((state) => state.footerSlice.data);
  const status = useSelector((state) => state.footerSlice.status);
  return (
    <Box backgroundColor="#262624" color="white" p="40px 0px" mt="20px">
      <Container maxWidth="md" sx={{ height: '100%' }}>
        {status === 'resolved' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              p: '0px 10px',
            }}>
            <Box>
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} variant="h3">
                  {data && data?.supportLinks[0]?.label}
                </Typography>
                <List>
                  {data?.supportLinks[0]?.link?.map((item, index) => (
                    <ListItem key={index} sx={{ p: '0px 0px 0px 0px', fontSize: '16px' }}>
                      <Link href={item.href}>{item.label}</Link>
                    </ListItem>
                  ))}{' '}
                </List>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} variant="h3">
                  {data && data?.aboutLinks[0]?.label}
                </Typography>
                <List>
                  {data?.aboutLinks[0]?.link?.map((item, index) => (
                    <ListItem key={index} sx={{ p: '0px 0px 0px 0px', fontSize: '16px' }}>
                      <Link href={item.href}>{item.label}</Link>
                    </ListItem>
                  ))}{' '}
                </List>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} variant="h3">
                  {data && data?.allProductsLinks[0]?.label}
                </Typography>
                <List>
                  {data?.allProductsLinks[0]?.link?.map((item, index) => (
                    <ListItem key={index} sx={{ p: '0px 0px 0px 0px', fontSize: '16px' }}>
                      <Link href={item.href}>{item.label}</Link>
                    </ListItem>
                  ))}{' '}
                </List>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} variant="h3">
                  {data && data?.socialLinks[0]?.label}
                </Typography>
                <List>
                  {data?.socialLinks[0]?.link?.map((item, index) => (
                    <ListItem key={index} sx={{ p: '0px 0px 0px 0px', fontSize: '16px' }}>
                      <Link href={item.href}>{item.label}</Link>
                    </ListItem>
                  ))}{' '}
                </List>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MobileFooter;
