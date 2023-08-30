import NewArrivalsSlider from 'components/NewArrivalsSlider';
import SectionBanner from 'components/SectionBanner';

const Home = ({ bannerData, newProductsData }) => {
  return (
    <>
      <SectionBanner bannerData={bannerData} />
      <NewArrivalsSlider newProductsData={newProductsData} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const bannerResponse = await fetch(`${process.env.API_URL}/api/section-banners?populate=*`);
  const newProductsData = await fetch(`${process.env.API_URL}/api/products/newarrivals`);

  const data = await bannerResponse.json();
  const newData = await newProductsData.json();

  return {
    props: {
      bannerData: data.data,
      newProductsData: newData.data.attributes,
    },
  };
}
