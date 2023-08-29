import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setToken } from '@/lib/auth';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  'auth/login',
  async function (credentials, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: credentials.identifier,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async function (userData, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserFromLocalCookie = createAsyncThunk(
  'auth/getUserFromLocalCookie',
  async function (jwt, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeUserData = createAsyncThunk(
  'auth/changeUserData',
  async function (userData, { rejectWithValue }) {
    const jwt = Cookies.get('jwt');
    try {
      const response = await fetch(`${process.env.API_URL}/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  isAuth: false,
  user: {
    id: '',
    email: '',
    fullName: '',
    lastName: '',
    country: '',
    city: '',
    adress: '',
    postCode: '',
    phone: '',
    orders: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, actions) {
      state.isAuth = !state.isAuth;
      state.user = actions.payload;
    },
    saveChanges(state, actions) {
      state.user = actions.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isAuth = !state.isAuth;
      state.user = action.payload;
      state.status = 'resolved';
      setToken(action.payload);
    },

    [login.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [getUserFromLocalCookie.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getUserFromLocalCookie.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.status = 'resolved';
    },

    [getUserFromLocalCookie.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [changeUserData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [changeUserData.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = 'resolved';
    },

    [changeUserData.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [register.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.status = 'resolved';
      setToken(action.payload);
    },

    [register.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { logIn, saveChanges } = authSlice.actions;

export default authSlice.reducer;
