import { Category } from "../Enums/Category";
import { CompanyModel } from "./CompanyModel";

export interface CouponModel {
  id: number;
  company: CompanyModel;
  category: Category;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}
