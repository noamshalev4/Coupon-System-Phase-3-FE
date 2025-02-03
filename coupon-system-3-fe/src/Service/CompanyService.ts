import { Category } from "../Enums/Category";
import { CouponModel } from "./../Model/CouponModel";
import { CompanyModel } from "./../Model/CompanyModel";
import axiosInst from "./AxiosInstance";

const url = "http://localhost:8080/api/v1/company";

// Coupon:
export async function addCouponApi(CouponModel: CouponModel) {
  return (await axiosInst.post(url + "/coupon", CouponModel)).data;
}

export async function updateCouponApi(CouponModel: CouponModel) {
  return await axiosInst.put(url + "/coupon", CouponModel);
}

export async function deleteCouponApi(id: number) {
  return await axiosInst.delete(url + "/coupon/" + id);
}

export async function getAllCouponsApi() {
  return (await axiosInst.get<CouponModel[]>(url + "/coupons")).data;
}

export async function getOneCouponApi(id: number) {
  return (await axiosInst.get<CouponModel>(url + "/coupon/" + id)).data;
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

// Company:
export async function getOneCompanyApi() {
  return (await axiosInst.get<CompanyModel>(url)).data;
}
