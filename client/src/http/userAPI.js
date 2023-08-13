import { $authHost, $host } from '.';

export const login = async (data) => {
  try {
    const response = await $host.post('/api/auth/local', data);
    return response;
  } catch (e) {
    return e;
  }
};

export const registration = async (newUser) => {
  console.log(newUser);
  try {
    const response = await $host.post('/api/auth/local/register', newUser);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async () => {
  try {
    const response = await $authHost.get('/api/users/me');
    return response;
  } catch (e) {
    return e;
  }
};

export const changeUserData = async (userData) => {
  try {
    const response = await $authHost.put(`/api/users/${userData.id}`, userData);
    return response;
  } catch (e) {
    return e;
  }
};
