import { ClientType } from "../Enums/ClientType";

export interface LoginRequestModel {
  email: string;
  password: string;
  clientType: ClientType;
}
