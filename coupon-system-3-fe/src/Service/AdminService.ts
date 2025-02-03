import { CustomerModel } from "./../Model/CustomerModel";
import { CompanyModel } from "./../Model/CompanyModel";
import axiosInstance from "./AxiosInstance";

const url = "http://localhost:8080/api/v1/admin";

// Company:
export async function addCompanyApi(companyModel: CompanyModel) {
  return (
    await axiosInstance.post<CompanyModel>(url + "/company", companyModel)
  ).data;
}

export async function updateCompanyApi(companyModel: CompanyModel) {
  return (await axiosInstance.put(url + "/company", companyModel)).data;
}

export async function deleteCompanyApi(id: number) {
  return await axiosInstance.delete(url + "/company/" + id);
}

export async function getAllCompaniesApi() {
  return (await axiosInstance.get<CompanyModel[]>(url + "/companies")).data;
}

export async function getOneCompanyApi(id: number) {
  return (await axiosInstance.get<CompanyModel>(url + "/company/" + id)).data;
}

// Customer:
export async function addCustomerApi(customerModel: CustomerModel) {
  return (
    await axiosInstance.post<CustomerModel>(url + "/customer", customerModel)
  ).data;
}

export async function updateCustomerApi(CustomerModel: CustomerModel) {
  return (await axiosInstance.put(url + "/customer", CustomerModel)).data;
}

export async function deleteCustomerApi(id: number) {
  return await axiosInstance.delete(url + "/customer/" + id);
}

export async function getAllCustomersApi() {
  return (await axiosInstance.get<CustomerModel[]>(url + "/customers")).data;
}

export async function getOneCustomerApi(id: number) {
  return (await axiosInstance.get<CustomerModel>(url + "/customer/" + id)).data;
}
