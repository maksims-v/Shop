import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Item from 'components/Item';

const PageCategory = ({ product }) => {
  const [data, setData] = useState(product);

  console.log(data);

  return (
    <Box
      margin="0 auto"
      display="grid"
      justifyContent="space-around"
      columnGap="1.33"
      rowGap="20px"
      gridTemplateColumns="repeat(auto-fill, 300px)">
      {/* {searchData && searchData.map((item) => <Item key={item.id} item={item} />)} */}
    </Box>
  );
};

export default PageCategory;

export async function getServerSideProps({ params }) {
  const { category } = params;

  console.log(category);

  const res = await fetch(`${process.env.API_URL}/api/products/${category}`);
  const product = await res.json();

  return { props: { product } };
}
