export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

export enum Sizes {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum Status {
  approbed = "approbed",
  pending = "pending",
  rejected = "rejected",
}

export type ItemType = {
  id: number;
  name: string;
  ingredients: string;
  size: Sizes;
  image_url: string;
  price: number;
  currency: Currency;
};

export type ItemTypeOrder = ItemType & {
  quantity: number;
};

export type OrderData = {
  items: ItemTypeOrder[];
  created_at: Date;
  name: string;
  contact: string;
  address: string;
  currency: Currency;
  status: Status;
  total: number;
};

export type ExchangeRate = {
  currency: Currency;
  rate: number;
};

export enum OrderItemEnum {
  header = "header",
  item = "item",
  subtotal = "subtotal",
  fees = "fees",
  total = "total",
}
