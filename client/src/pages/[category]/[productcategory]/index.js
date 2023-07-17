import { Box, Breadcrumbs } from '@mui/material';
import Item from 'components/Item';
import Link from 'next/link';

const Category = ({ product }) => {
  console.log(product.data[0].attributes.category);

  return (
    <Box mt="10px">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/${product?.data[0]?.attributes?.category}`}>
          {product?.data[0]?.attributes?.category.toUpperCase()}
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

export default Category;

export async function getServerSideProps({ params, query }) {
  const { productcategory, category } = params;

  const res = await fetch(`${process.env.API_URL}/api/products/${category}/${productcategory}`);
  const product = await res.json();

  return { props: { product } };
}
