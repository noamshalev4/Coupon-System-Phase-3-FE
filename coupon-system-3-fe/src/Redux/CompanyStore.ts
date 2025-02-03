import { CompanyModel } from "./../Model/CompanyModel";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponModel } from "../Model/CouponModel";

interface CompanyState {
  company: CompanyModel | null;
  coupons: CouponModel[];
}

const initialState: CompanyState = {
  company: null,
  coupons: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCouponAction: (state, action: PayloadAction<CouponModel>) => {
      state.coupons.push(action.payload);
    },

    updateCouponAction: (state, action: PayloadAction<CouponModel>) => {
      const index = state.coupons.findIndex(
        (coupon) => coupon.id === action.payload.id
      );
      if (index !== -1) {
        state.coupons[index] = action.payload;
      }
    },

    deleteCouponAction: (state, action: PayloadAction<number>) => {
      state.coupons = state.coupons.filter(
        (coupon) => coupon.id !== action.payload
      );
    },

    getAllCouponsAction: (state, action: PayloadAction<CouponModel[]>) => {
      state.coupons = action.payload;
    },

    getCompanyAction: (state, action: PayloadAction<CompanyModel>) => {
      state.company = action.payload;
    },

    clearCompanyStateAction: (state) => {
      state.company = null;
      state.coupons = [];
    },
  },
});

export const {
  addCouponAction,
  updateCouponAction,
  deleteCouponAction,
  getAllCouponsAction,
  getCompanyAction,
  clearCompanyStateAction,
} = companySlice.actions;
export const companyStore = configureStore({
  reducer: companySlice.reducer,
});
