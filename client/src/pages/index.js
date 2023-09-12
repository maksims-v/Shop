const qs = require('qs');
import NewArrivalsSlider from 'components/NewArrivalsSlider';
import SectionBanner from 'components/SectionBanner';
import PopularCategorySection from 'components/PopularCategorySection';
import ClearanseSlider from 'components/ClearanseSlider';
import SectionCategory from 'components/SectionCategory';

const Home = ({ bannerData, newProductsData, clearenceData, sectionCategoryData }) => {
  return (
    <>
      <SectionBanner bannerData={bannerData} />
      <PopularCategorySection />
      <NewArrivalsSlider newProductsData={newProductsData} />
      <SectionCategory
        sectionCategoryData={
          sectionCategoryData?.data && sectionCategoryData?.data[0]?.attributes?.category
        }
      />
      <ClearanseSlider clearenceData={clearenceData} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const query = qs.stringify({
    filters: {
      clearance: true,
    },
    populate: { image: true },
  });

  const sectionCategoryQuery = qs.stringify({
    populate: {
      category: {
        populate: { image: true },
      },
    },
  });

  const bannerResponse = await fetch(`${process.env.API_URL}/api/section-banners?populate=*`);
  const newProductsResponse = await fetch(`${process.env.API_URL}/api/products/newarrivals`);
  const clearenceResponse = await fetch(`${process.env.API_URL}/api/products?${query}`);
  const sectionCategoryResponse = await fetch(
    `${process.env.API_URL}/api/section-categories?${sectionCategoryQuery}`,
  );

  const bannerDataJson = await bannerResponse.json();
  const newProductsJson = await newProductsResponse.json();
  const clearenceDataJson = await clearenceResponse.json();
  const sectionCategoryDataJson = await sectionCategoryResponse.json();

  return {
    props: {
      bannerData: bannerDataJson.data,
      newProductsData: newProductsJson.data.attributes.sortedProducts,
      clearenceData: clearenceDataJson.data,
      sectionCategoryData: sectionCategoryDataJson,
    },
  };
}
