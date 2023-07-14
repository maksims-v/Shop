const Category = ({ product }) => {
  console.log(product);

  return <div>productCategory</div>;
};

export default Category;

export async function getServerSideProps({ params, query }) {
  const { productcategory, category } = params;

  const res = await fetch(`${process.env.API_URL}/api/products/${category}/${productcategory}`);
  const product = await res.json();

  return { props: { product } };
}
