import { Box, Breadcrumbs } from '@mui/material';
import Item from 'components/Item';
import Link from 'next/link';

const PageCategory = ({ product }) => {
  return (
    <Box mt="10px">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          HOME
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

export default PageCategory;

export async function getServerSideProps({ params }) {
  const { gender } = params;

  const res = await fetch(`${process.env.API_URL}/api/products/${gender}`);
  const product = await res.json();

  return { props: { product } };
}
