// Currencies
export const EUR = "EUR";
export const USD = "USD";
export const DELIVERY_FEE = 10;

// notification messages

export const ITEM_ADDED = "1 item added";
export const ITEM_REMOVED = "1 item removed";
export const ITEM_DELETED = "All items equal removed";
export const ORDER_MADE = "🍕 Your order was sent successfully, Thanks!";
export const ORDER_CLEARED = "The order was cleared";

// urls

export const BACKEND_URL_GOOGLE_LOGIN = `${process.env.REACT_APP_BACK_URL}${process.env.REACT_APP_BACK_LOGIN_GOOGLE_USER}`;

// localStorage

export const LOCAL_STORAGE_KEYS = {
  currentOrderItems: "currentOrderItems",
  currentTotal: "currentTotal",
  lastOrders: "lastOrders",
  currentCurrency: "currentCurrency",
};
