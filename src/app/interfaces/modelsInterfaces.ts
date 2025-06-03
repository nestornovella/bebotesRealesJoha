

export interface Category {
  id?: string;
  name: string;
  parentId?: string | null;

  parent?: Category | null;
  subCategories?: Category[];
  products?: Product[];
}

export interface Product {
  id?: string;
  name: string;
  description?: string | null;
  price: number;
  weight: number;
  length: number;
  active?: boolean;
  image: string;

  categories: Category[];

  parentId?: string | null;
  parent?: Product | null;
  subProduct?: Product[];

  orderItems?: OrderItem[];
}

export interface Order {
  id: string;
  totalAmount: number;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  subTotal: number;
  orderId: string;
  productId: string;

  order?: Order;
  product?: Product;
}
