export const login = async (email, pass) => {
  const res = await fetch(`${process.env.API_URL}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password: pass,
    }),
  });
  const data = await res.json();

  return { data };
};

export const registration = async (newUser) => {
  const res = await fetch('http://localhost:1337/api/auth/local/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  const data = await res.json();

  return { data };
};

export const getUser = async (token) => {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return false;
  }
};

export const changeUserData = async (newData, id) => {
  const token = localStorage.getItem('accestoken');

  const res = await fetch(`http://127.0.0.1:1337/api/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });
  const data = await res.json();

  return data;
};
