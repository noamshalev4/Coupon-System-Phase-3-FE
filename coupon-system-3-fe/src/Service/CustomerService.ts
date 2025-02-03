import { Category } from "../Enums/Category";
import { CouponModel } from "./../Model/CouponModel";
import axiosInst from "./AxiosInstance";
import { CustomerModel } from "../Model/CustomerModel";

const url = "http://localhost:8080/api/v1/customer";

// Coupon:
export async function purchaseCouponApi(id: number) {
  return (await axiosInst.post<CouponModel>(url + "/purchase_coupon/" + id))
    .data;
}

export async function getAllCouponsOfCustomerApi() {
  return (await axiosInst.get<CouponModel[]>(url + "/coupons")).data;
}

export async function getAllCouponsApi() {
  return (await axiosInst.get<CouponModel[]>(url + "/all-coupons")).data;
}

export async function getAllCouponsByCategoryApi(category: Category) {
  return (
    await axiosInst.get<CouponModel[]>(
      url + "/coupons/category?category=" + category
    )
  ).data;
}

export async function getAllCouponsByMaxPriceApi(maxPrice: string) {
  return (
    await axiosInst.get<CouponModel[]>(
      url + "/coupons/max_price?maxPrice=" + maxPrice
    )
  ).data;
}

// Customer:
export async function getOneCustomerApi() {
  return (await axiosInst.get<CustomerModel>(url)).data;
}
