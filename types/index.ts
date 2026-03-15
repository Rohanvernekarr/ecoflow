export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  original_price?: number;
  quantity: number;
  image: string;
}

export interface CartPayload {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

export interface ShippingAddress {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  pinCode: string;
  city: string;
  state: string;
  addressType?: "Home" | "Work" | "Other";
}
