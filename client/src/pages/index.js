const qs = require('qs');
import NewArrivalsSlider from 'components/NewArrivalsSlider';
import SectionBanner from 'components/SectionBanner';
import PopularCategorySection from 'components/PopularCategorySection';
import ClearanseSlider from 'components/ClearanseSlider';
import SectionCategory from 'components/SectionCategory';
import SecondSectionBanner from 'components/SecondSectionBanner';
import SectionBrands from 'components/SectionBrands';

const Home = ({
  bannerData,
  newProductsData,
  clearenceData,
  sectionCategoryData,
  secondBannerData,
  sectionPopularCategoryData,
  sectionBrandData,
}) => {
  return (
    <>
      <SectionBanner bannerData={bannerData} />
      <PopularCategorySection sectionPopularCategoryData={sectionPopularCategoryData} />
      <SectionBrands sectionBrandData={sectionBrandData} />
      <NewArrivalsSlider newProductsData={newProductsData} />
      <SecondSectionBanner secondBannerData={secondBannerData} />
      <SectionCategory
        sectionCategoryData={
          sectionCategoryData?.data && sectionCategoryData?.data[0]?.attributes?.category
        }
      />
      {/* <ClearanseSlider clearenceData={clearenceData} /> */}
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

  const sectionPopelarCategoryQuery = qs.stringify({
    populate: {
      popularCategeory: {
        populate: { image: true },
      },
    },
  });

  const sectionBrandQuery = qs.stringify({
    populate: {
      brandSection: {
        populate: { image: true, products: { populate: { image: true } } },
      },
    },
  });

  const bannerResponse = await fetch(`${process.env.API_URL}/api/section-banners?populate=*`);
  const secondBannerResponse = await fetch(
    `${process.env.API_URL}/api/second-section-banners?populate=*`,
  );
  const popularCategoryResponse = await fetch(
    `${process.env.API_URL}/api/section-popular-categories?${sectionPopelarCategoryQuery}`,
  );
  const newProductsResponse = await fetch(`${process.env.API_URL}/api/products/newarrivals`);
  const clearenceResponse = await fetch(`${process.env.API_URL}/api/products?${query}`);
  const sectionCategoryResponse = await fetch(
    `${process.env.API_URL}/api/section-categories?${sectionCategoryQuery}`,
  );

  const sectionBrandResponse = await fetch(
    `${process.env.API_URL}/api/section-brands?${sectionBrandQuery}`,
  );

  const bannerDataJson = await bannerResponse.json();
  const secondBannerDataJson = await secondBannerResponse.json();
  const popularCategoryDataJson = await popularCategoryResponse.json();
  const newProductsJson = await newProductsResponse.json();
  const clearenceDataJson = await clearenceResponse.json();
  const sectionCategoryDataJson = await sectionCategoryResponse.json();
  const sectionBrandDataJson = await sectionBrandResponse.json();

  return {
    props: {
      bannerData: bannerDataJson.data,
      newProductsData: newProductsJson.data.attributes.sortedProducts,
      clearenceData: clearenceDataJson.data,
      sectionCategoryData: sectionCategoryDataJson,
      secondBannerData: secondBannerDataJson?.data,
      sectionPopularCategoryData: popularCategoryDataJson?.data,
      sectionBrandData: sectionBrandDataJson,
    },
  };
}
