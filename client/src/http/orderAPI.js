import { $orderHost } from '.';

export const createOrder = async (newOrder) => {
  console.log(newOrder);
  try {
    const response = await $orderHost.post('/api/orders', newOrder);
    return response;
  } catch (error) {
    return error;
  }
};
