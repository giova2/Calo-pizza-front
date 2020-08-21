import {
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  DISPLAY_ORDER_PANEL,
  SET_CURRENCY,
  SET_ACTUAL_CURRENCY,
  GET_ITEMS,
  NOTIFICATION,
  MAKE_ORDER,
  DISPLAY_PREV_ORDERS,
  SIGN_IN,
  SIGN_OUT,
  GET_ORDERS,
  CLEAR_ORDER,
  DISPLAY_LOADING_LAYER,
  apiUser,
} from "./types";
import {
  USD,
  EUR,
  ITEM_ADDED,
  ITEM_REMOVED,
  ITEM_DELETED,
  ORDER_MADE,
  ORDER_CLEARED,
} from "../constants";
import {
  getRates,
  myRound,
  getItems,
  makeOrder,
  getOrders,
} from "../resources";
import { OrderData } from "../types";
import { store } from "../index";

export const listUserOrders = async (userId: string) => {
  try {
    const response = await getOrders(userId);
    store.dispatch({ type: GET_ORDERS, payload: response });
  } catch (error) {
    store.dispatch(notificationAction("error", error));
  }
};

export const signIn = (user: apiUser) => {
  listUserOrders(user.userId);
  return {
    type: SIGN_IN,
    payload: user,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const getItemsAction = async (dispatch: any) => {
  try {
    const items = await getItems();
    dispatch({ type: GET_ITEMS, payload: items });
  } catch (error) {
    dispatch(notificationAction("error", error));
  }
};

export const getCurrencyRate = async (
  dispatch: any,
  currency: string = USD
) => {
  try {
    const rate = await getRates(currency);
    dispatch({
      type: SET_CURRENCY,
      payload: {
        currency,
        rate: myRound(rate),
        //+(Math.round(parseFloat(rate + "e+2")) + "e-2"),
      },
    });
  } catch (error) {
    dispatch(notificationAction("error", error));
  }
};

export const setActualCurrency = (currency: string = EUR) => {
  return { type: SET_ACTUAL_CURRENCY, payload: currency };
};

export const notificationAction = (
  type: string | null,
  message: string | null
) => {
  return { type: NOTIFICATION, payload: { type, message } };
};

export const makeOrderAction = async (
  dispatch: any,
  newOrder: OrderData,
  userId?: string
) => {
  try {
    const response = await makeOrder(newOrder, userId);
    if (response && response.data && response.data.success) {
      dispatch(notificationAction("ok", ORDER_MADE));
      dispatch({ type: MAKE_ORDER, payload: response.data.success });
    }
  } catch (error) {
    dispatch(notificationAction("error", error));
  }
};

export const addItem = (id: number, notify: boolean = true) => {
  notify && store.dispatch(notificationAction("ok", ITEM_ADDED));
  return { type: ADD_ITEM, payload: id };
};

export const removeItem = (id: number, notify: boolean = true) => {
  notify && store.dispatch(notificationAction("warn", ITEM_REMOVED));
  return { type: REMOVE_ITEM, payload: id };
};

export const deleteItem = (
  id: number,
  numItemsOrder: number,
  notify: boolean = true
) => {
  numItemsOrder === 1 && store.dispatch(displayOrderPanel(false));
  notify && store.dispatch(notificationAction("warn", ITEM_DELETED));
  return { type: DELETE_ITEM, payload: id };
};

export const displayOrderPanel = (display: boolean) => {
  display === true && store.dispatch(displayPrevOrdersAction(false));
  return { type: DISPLAY_ORDER_PANEL, payload: display };
};

export const displayPrevOrdersAction = (display: boolean) => {
  display === true && store.dispatch(displayOrderPanel(false));
  return { type: DISPLAY_PREV_ORDERS, payload: display };
};

export const displayLoadingLayer = (display: boolean) => {
  return { type: DISPLAY_LOADING_LAYER, payload: display };
};

export const clearOrderAction = () => {
  store.dispatch(notificationAction("ok", ORDER_CLEARED));
  return { type: CLEAR_ORDER, payload: true };
};
