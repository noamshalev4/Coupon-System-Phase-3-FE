import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyModel } from "../Model/CompanyModel";
import { CustomerModel } from "../Model/CustomerModel";

interface AdminState {
  companies: CompanyModel[];
  customers: CustomerModel[];
}

const initialState: AdminState = {
  companies: [],
  customers: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAllCompaniesAction: (state, action: PayloadAction<CompanyModel[]>) => {
      state.companies = action.payload;
    },

    addCompanyAction: (state, action: PayloadAction<CompanyModel>) => {
      state.companies.push(action.payload);
    },

    updateCompanyAction: (state, action: PayloadAction<CompanyModel>) => {
      const index = state.companies.findIndex(
        (company) => company.id === action.payload.id
      );
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },

    deleteCompanyAction: (state, action: PayloadAction<number>) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
    },

    getAllCustomersAction: (state, action: PayloadAction<CustomerModel[]>) => {
      state.customers = action.payload;
    },

    addCustomerAction: (state, action: PayloadAction<CustomerModel>) => {
      state.customers.push(action.payload);
    },

    updateCustomerAction: (state, action: PayloadAction<CustomerModel>) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },

    deleteCustomerAction: (state, action: PayloadAction<number>) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },
  },
});

export const {
  addCompanyAction,
  getAllCompaniesAction,
  getAllCustomersAction,
  updateCompanyAction,
  updateCustomerAction,
  deleteCompanyAction,
  addCustomerAction,
  deleteCustomerAction,
} = adminSlice.actions;
export const adminStore = configureStore({
  reducer: adminSlice.reducer,
});
