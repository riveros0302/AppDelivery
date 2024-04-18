import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {
  id?: string;
  email: string;
  name: string;
  lastname: string;
  phone: string;
  image?: string;
  password: string;
  confirmPassword: string;
  session_token?: string;
  roles?: Rol[];
  address?: Address;
}
