'use client';

import useSWR from 'swr';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SectionBanner = () => {
  const { data, isLoading, error } = useSWR(
    `${process.env.API_URL}/api/section-banners?populate=*`,
    fetcher,
  );

  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    data &&
    data.data.length !== 0 && (
      <Box sx={{ mb: mobile ? '0px' : '50px', width: '100%', position: 'relative' }}>
        <Link
          href={`shop/${data.data[0].attributes.pageCategory}/${data.data[0].attributes.category}/${data.data[0].attributes.subcategory}`}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '90%',
              m: '0 auto',
              textAlign: 'center',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
            }}>
            {data.data[0].attributes?.title}
          </Typography>
          <Button
            size="large"
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'white',
                borderColor: '#0062cc',
                boxShadow: 'none',
              },
            }}>
            SHOP HERE
          </Button>
          <img
            alt="banner"
            style={{
              width: '100%',
              objectFit: 'cover',
              height: mobile ? '300px' : 'auto',
            }}
            src={`${process.env.API_URL}${data.data[0].attributes.image.data.attributes.url}`}
          />
        </Link>
      </Box>
    )
  );
};

export default SectionBanner;
