interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  phone_numbers: UserPhoneNumber[];
  addresses: UserAddress[];
  access_tokens: UserAccessToken[];
  created_at: string;
  updated_at: string;
}

interface CreateUser {
  email: string;
  name: string;
  surname: string;
  password: string;
}

interface UserPhoneNumber {
  id: number;
  code: string;
  phone_number: number;
  user: number;
  created_at: string;
  updated_at: string;
}

interface UserAddress {
  id: number;
  country: string;
  state: string;
  city: string;
  street_address: string;
  postal_code: string;
  user: number;
  created_at: string;
  updated_at: string;
}

interface UserAccessToken {
  id: number;
  access_token: string;
  refresh_token: string;
  user: number;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface UserPhoneNumberEdit {
  user?: number;
  code: string;
  phone_number: number;
}

interface EditUserType {
  email?: string;
  name?: string;
  surname?: string;
  password?: string;
  phone_numbers?: UserPhoneNumberEdit[];
  addresses?: UserAddress[];
}

interface EditPasswordType {
  user_id?: number;
  current_password: string;
  new_password: string;
  validate_password?: string;
}

interface EditUserAddress {
  user?: number;
  country: string;
  state: string;
  city: string;
  street_address: string;
  postal_code: string;
}

interface ContactType {
  name: string;
  email: string;
  message: string;
}
