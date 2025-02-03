import axios from "axios";
import { LoginRequestModel } from "../Model/LoginRequestModel";
import { LoginResponseModel } from "../Model/LoginResponseModel";
import axiosInstance from "./AxiosInstance";

const url = "http://localhost:8080/api/v1/auth";

export async function loginApi(loginRequest: LoginRequestModel) {
  return (await axios.post<LoginResponseModel>(url + "/login", loginRequest))
    .data;
}

export async function logoutApi() {
  return await axiosInstance.delete(url + "/logout");
}
