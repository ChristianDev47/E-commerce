interface OrderItem {
  product_id: number;
  quantity?: number;
}

interface Order {
  buyer?: number;
  status?: string;
  shipping_address?: number;
  order_items?: OrderItem[];
}

interface OrdersType {
  id: number;
  buyer: string;
  shipping_address: address;
  order_items: OrderItems[];
  total_cost: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface address {
  user?: number;
  country: string;
  state: string;
  city: string;
  street_address: string;
  postal_code: string;
}

interface OrderItems {
  id: number;
  order: number;
  product: Product;
  quantity: number;
  price: number;
  cost: number;
  created_at: Date;
  updated_at: Date;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  images: Image[];
}

interface Image {
  id: number;
  image: string;
  product: number;
}
