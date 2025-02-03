import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientType } from "../Enums/ClientType";
import { LoginResponseModel } from "../Model/LoginResponseModel";

interface AuthState {
  user: LoginResponseModel;
}

const getUserFromLocalStorage = (): LoginResponseModel => {
  const user = localStorage.getItem("user");
  return user
    ? JSON.parse(user)
    : {
        id: 0,
        token: "",
        email: "",
        name: "",
        clientType: ClientType.GUEST,
        expirationTime: new Date(),
      };
};

const initState: AuthState = {
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initState,
  reducers: {
    loginAction: (state, action: PayloadAction<LoginResponseModel>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = {
        id: 0,
        token: "",
        email: "",
        name: "",
        clientType: ClientType.GUEST,
        expirationTime: null,
      };
      localStorage.removeItem("user");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export const authStore = configureStore({
  reducer: authSlice.reducer,
});
