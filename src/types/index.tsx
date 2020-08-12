export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

export type ItemType = {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  currency: Currency;
};

export type ItemTypeOrder = ItemType & {
  quantity: number;
};

export type OrderData = {
  items: ItemTypeOrder[];
  name: string;
  contact: string;
  address: string;
  currency: Currency;
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
