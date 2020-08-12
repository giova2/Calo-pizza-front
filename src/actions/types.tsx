export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const MAKE_ORDER = "MAKE_ORDER";
export const DISPLAY_ORDER_PANEL = "DISPLAY_ORDER_PANEL";
export const SET_CURRENCY = "SET_CURRENCY";
export const SET_ACTUAL_CURRENCY = "SET_ACTUAL_CURRENCY";
export const GET_ITEMS = "GET_ITEMS";
export const NOTIFICATION = "NOTIFICATION";
export const DISPLAY_PREV_ORDERS = "DISPLAY_PREV_ORDERS";

export type reduxAction = {
  type: string;
  payload?: any;
};
