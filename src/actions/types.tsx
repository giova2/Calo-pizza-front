export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const MAKE_ORDER = "MAKE_ORDER";
export const DISPLAY_ORDER_PANEL = "DISPLAY_ORDER_PANEL";
export const SET_CURRENCY = "SET_CURRENCY";
export const SET_ACTUAL_CURRENCY = "SET_ACTUAL_CURRENCY";
export const GET_ITEMS = "GET_ITEMS";
export const NOTIFICATION = "NOTIFICATION";
export const DISPLAY_PREV_ORDERS = "DISPLAY_PREV_ORDERS";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const GET_ORDERS = "GET_ORDERS";
export const CLEAR_ORDER = "CLEAR_ORDER";

export type reduxAction = {
  type: string;
  payload?: any;
};

export type apiUser = {
  userId: string;
  email: string;
};
