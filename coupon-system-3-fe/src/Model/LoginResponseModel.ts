import { ClientType } from "../Enums/ClientType";

export interface LoginResponseModel {
  id: number;
  token: string;
  email: string;
  name: string;
  clientType: ClientType;
  expirationTime: Date | null;
}
