import { $host } from '.';

export const getSliderData = async () => {
  try {
    const response = await $host.get('/api/sliders?pupulate=*');
    return response;
  } catch (e) {
    return e;
  }
};
