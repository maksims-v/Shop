import { Box } from '@mui/material';
import Item from 'components/Item';

const Search = ({ data }) => {
  return (
    <Box
      margin="0 auto"
      display="grid"
      justifyContent="space-around"
      columnGap="1.33"
      rowGap="20px"
      gridTemplateColumns="repeat(auto-fill, 300px)">
      {data && data.data.map((item) => <Item key={item.id} item={item} />)}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const { search } = query;

  const res = await fetch(`${process.env.API_URL}/api/products/filter?search=${search}`);
  const data = await res.json();

  return { props: { data } };
}
