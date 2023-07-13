const categoryPage = ({ product }) => {
  console.log(product);

  return <div>asdasda</div>;
};

export default categoryPage;

export async function getServerSideProps({ params, query }) {
  const { category } = params;

  const res = await fetch(`${process.env.API_URL}/api/products/categorysearch?search=${category}`);
  const product = await res.json();

  return { props: { product } };
}
