import {
  ADD_ITEM,
  REMOVE_ITEM,
  DISPLAY_ORDER_PANEL,
  SET_CURRENCY,
  SET_ACTUAL_CURRENCY,
  GET_ITEMS,
  NOTIFICATION,
  MAKE_ORDER,
  DISPLAY_PREV_ORDERS,
} from "./types";
import { USD, EUR } from "../constants";
import { getRates, myRound, getItems, makeOrder } from "../resources";
import { OrderData } from "../types";
import { store } from "../index";

export const getItemsAction = async (dispatch: any) => {
  try {
    const items = await getItems();
    dispatch({ type: GET_ITEMS, payload: items });
  } catch (error) {
    console.log({ error });
    dispatch(notificationAction("error", error));
  }
};

export const addItem = (id: number, notify: boolean = true) => {
  notify && store.dispatch(notificationAction("ok", "Item added"));
  return { type: ADD_ITEM, payload: id };
};

export const removeItem = (id: number, notify: boolean = true) => {
  notify && store.dispatch(notificationAction("warn", "Item removed"));
  return { type: REMOVE_ITEM, payload: id };
};

export const displayOrderPanel = (val: boolean) => {
  return { type: DISPLAY_ORDER_PANEL, payload: val };
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
    console.log({ error });
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

export const makeOrderAction = async (dispatch: any, newOrder: OrderData) => {
  try {
    const response = await makeOrder(newOrder);
    if (response && response.data && response.data.success) {
      dispatch(
        notificationAction("ok", "🍕 Your order was sent successfully, Thanks!")
      );
      dispatch({ type: MAKE_ORDER, payload: response.data.success });
    }
  } catch (error) {
    console.log({ error });
    dispatch(notificationAction("error", error));
  }
};
export const displayPrevOrdersAction = (display: boolean) => {
  return { type: DISPLAY_PREV_ORDERS, payload: display };
};
