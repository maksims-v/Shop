import { Box, Breadcrumbs } from '@mui/material';
import Item from 'components/Item';
import Link from 'next/link';
import { useState } from 'react';

const SubCategory = ({ product }) => {
  const [data] = useState(product);

  return (
    <Box mt="10px">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/${data?.attributes?.gender}`}>
          {data && data.data[0]?.attributes?.gender.toUpperCase()}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/${data.data[0]?.attributes?.gender}/${data.data[0]?.attributes?.category}`}>
          {data && data.data[0]?.attributes?.category.toUpperCase()}
        </Link>
      </Breadcrumbs>
      <Box
        margin="0 auto"
        display="grid"
        justifyContent="space-around"
        columnGap="1.33"
        rowGap="20px"
        gridTemplateColumns="repeat(auto-fill, 300px)">
        {product && product.data.map((item) => <Item key={item.id} item={item} />)}
      </Box>
    </Box>
  );
};

export default SubCategory;

export async function getServerSideProps({ params }) {
  const { gender, category, subcategory } = params;

  const res = await fetch(
    `${process.env.API_URL}/api/products/${gender}/${category}/${subcategory}`,
  );
  const product = await res.json();

  return { props: { product } };
}
