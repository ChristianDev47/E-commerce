export interface PaymentCard {
  card_number: string;
  name: string;
  due_date: DueDate;
  cvc: string;
  user: number;
}

export interface CreatePaymentCardType {
  card_number?: string;
  name?: string;
  due_date?: string;
  cvc?: string;
  user?: number;
}

interface DueDate {
  month?: string;
  year?: string;
}

export interface CardPaymentType {
  id: number;
  card_number: string;
  name: string;
  user: User;
  due_date: string;
  cvc: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  password: string;
  last_login: null;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  date_joined: Date;
  email: string;
  name: string;
  surname: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_staff: boolean;
}
