import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from 'components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProductsSliderData } from '@/state/relatedProductsSliderSlice';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const RelatedProductsSlider = (query) => {
  const relatedProductsData = useSelector((state) => state.relatedProductsSliderSlice.data);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const dispatch = useDispatch();

  const responsive = {
    0: { items: mobile ? 3 : 1 },
    568: { items: 2 },
    1152: { items: 5 },
  };

  useEffect(() => {
    dispatch(getRelatedProductsSliderData(query));
  }, [query.id]);

  return (
    relatedProductsData.length !== 0 && (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box m="0 auto">
          <AliceCarousel
            mouseTracking
            animationDuration={800}
            disableDotsControls="true"
            infinite
            //  autoPlay
            autoPlayInterval={2000}
            items={relatedProductsData?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </Box>
      </Box>
    )
  );
};

export default RelatedProductsSlider;
