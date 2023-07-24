import { Box, Breadcrumbs } from '@mui/material';
import Item from 'components/Item';
import Link from 'next/link';

const Category = ({ product, gender, error }) => {
  const genderLink = gender ? gender : '';

  console.log(gender);
  return (
    <Box mt="10px">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          HOME
        </Link>
        <Link underline="hover" color="inherit" href={`/${genderLink}`}>
          {genderLink.toUpperCase()}
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

export async function getServerSideProps({ params }) {
  const { gender, category } = params;

  const res = await fetch(`${process.env.API_URL}/api/products/${gender}/${category}`);
  const product = await res.json();

  return { props: { product, gender } };
}
