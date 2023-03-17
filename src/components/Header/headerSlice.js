import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  isLogged: false,
  accessToken: "",
  user: {
    isAdmin: true,
    enabled: true,
    _id: "",
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    avatarUrl: "",
  },
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setModalVisible: (state, { payload }) => {
      state.modalVisible = payload;
    },
    setLogged: (state, { payload }) => {
      state.isLogged = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setDefaultUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const {
  setModalVisible,
  setLogged,
  setUser,
  setAccessToken,
  setDefaultUser,
} = headerSlice.actions;

export default headerSlice.reducer;
