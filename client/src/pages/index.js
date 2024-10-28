'use client';

import useSWR from 'swr';
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
  sectionBrandData,
}) => {
  return (
    <>
      <SectionBanner />
      <PopularCategorySection />
      <SectionBrands />
      <NewArrivalsSlider />
      <SecondSectionBanner secondBannerData={secondBannerData} />
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

export async function getServerSideProps() {
  // const query = qs.stringify({
  //   filters: {
  //     clearance: true,
  //   },
  //   populate: { image: true },
  // });

  // const newArrivalsQueryFilters = qs.stringify({
  //   filters: {
  //     new: true,
  //   },
  //   populate: { image: true },
  //   pagination: {
  //     limit: 20,
  //   },
  // });

  // const sectionCategoryQuery = qs.stringify({
  //   populate: {
  //     category: {
  //       populate: { image: true },
  //     },
  //   },
  // });

  // const sectionPopelarCategoryQuery = qs.stringify({
  //   populate: {
  //     popularCategeory: {
  //       populate: { image: true },
  //     },
  //   },
  // });

  // const sectionBrandQuery = qs.stringify({
  //   populate: {
  //     brandSection: {
  //       populate: { image: true, products: { populate: { image: true } } },
  //     },
  //   },
  // });

  const bannerResponse = await fetch(`${process.env.API_URL}/api/section-banners?populate=*`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const bannerDataJson = await bannerResponse.json();

  return {
    props: {
      bannerData: bannerDataJson,
    },
  };
}
//   const newArrivalsResponse = await fetch(
//     `${process.env.API_URL}/api/products?${newArrivalsQueryFilters}`,
//   );

//   const secondBannerResponse = await fetch(
//     `${process.env.API_URL}/api/second-section-banners?populate=*`,
//   );
//   const popularCategoryResponse = await fetch(
//     `${process.env.API_URL}/api/section-popular-categories?${sectionPopelarCategoryQuery}`,
//   );
//   const clearenceResponse = await fetch(`${process.env.API_URL}/api/products?${query}`);
//   const sectionCategoryResponse = await fetch(
//     `${process.env.API_URL}/api/section-categories?${sectionCategoryQuery}`,
//   );

//   const sectionBrandResponse = await fetch(
//     `${process.env.API_URL}/api/section-brands?${sectionBrandQuery}`,
//   );

//   const newArrivalsDataJson = await newArrivalsResponse.json();
//   const secondBannerDataJson = await secondBannerResponse.json();
//   const popularCategoryDataJson = await popularCategoryResponse.json();
//   const clearenceDataJson = await clearenceResponse.json();
//   const sectionCategoryDataJson = await sectionCategoryResponse.json();
//   const sectionBrandDataJson = await sectionBrandResponse.json();

//   return {
//     props: {
//       bannerData: bannerDataJson.data,
//       newProductsData: newArrivalsDataJson,
//       clearenceData: clearenceDataJson.data,
//       sectionCategoryData: sectionCategoryDataJson,
//       secondBannerData: secondBannerDataJson?.data,
//       sectionPopularCategoryData: popularCategoryDataJson?.data,
//       sectionBrandData: sectionBrandDataJson,
//     },
//   };
// }
