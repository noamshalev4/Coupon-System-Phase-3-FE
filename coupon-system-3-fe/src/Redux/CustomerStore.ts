import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponModel } from "../Model/CouponModel";
import { CustomerModel } from "../Model/CustomerModel";

interface CustomerState {
  customer: CustomerModel | null;
  allCoupons: CouponModel[];
  myCoupons: CouponModel[];
}

const initialState: CustomerState = {
  customer: null,
  allCoupons: [],
  myCoupons: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    purchaseCouponAction: (state, action: PayloadAction<CouponModel>) => {
      state.myCoupons.push(action.payload);
      state.allCoupons = state.allCoupons.map((coupon) =>
        coupon.id === action.payload.id ? action.payload : coupon
      );
    },

    getAllCouponsAction: (state, action: PayloadAction<CouponModel[]>) => {
      state.allCoupons = action.payload;
    },

    getMyCouponsAction: (state, action: PayloadAction<CouponModel[]>) => {
      state.myCoupons = action.payload;
    },

    getCustomerAction: (state, action: PayloadAction<CustomerModel>) => {
      state.customer = action.payload;
    },
    clearCustomerStateAction: (state) => {
      state.customer = null;
      state.allCoupons = [];
      state.myCoupons = [];
    },
  },
});

export const {
  purchaseCouponAction,
  getAllCouponsAction,
  getMyCouponsAction,
  getCustomerAction,
  clearCustomerStateAction,
} = customerSlice.actions;
export const customerStore = configureStore({
  reducer: customerSlice.reducer,
});
