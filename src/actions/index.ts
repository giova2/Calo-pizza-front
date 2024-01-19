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
  RECOVER_ORDER,
  RECOVER_LAST_ORDERS,
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
  LOCAL_STORAGE_KEYS,
} from "../constants";
import {
  getRates,
  myRound,
  getItems,
  makeOrder,
  getOrders,
  localStorageManipulation,
} from "../resources";
import { OrderData, LocalStorageActions, ItemType, ItemTypeApiResponse } from "../types";
import { store } from "../index";

export const listUserOrders = async (userId: string) => {
  try {
    const response = await getOrders(userId);
    store.dispatch({ type: GET_ORDERS, payload: response });
  } catch (error) {
    if(typeof error === 'string'){
      store.dispatch(notificationAction("error", error as string));
    }
  }
};

export const recoverOrder = () => {
  return {
    type: RECOVER_ORDER,
  };
};

export const recoverLastOrders = () => {
  const lastOrders = localStorageManipulation(
    LocalStorageActions.GET,
    LOCAL_STORAGE_KEYS.lastOrders
  );
  const checkLastOrders =
    lastOrders === null || lastOrders === undefined
      ? []
      : JSON.parse(lastOrders);
  return {
    type: RECOVER_LAST_ORDERS,
    payload: checkLastOrders,
  };
};

export const signIn = (user: apiUser) => {
  listUserOrders(user.userId);
  return {
    type: SIGN_IN,
    payload: user,
  };
};

export const signOut = () => {
  localStorage.clear();
  return {
    type: SIGN_OUT,
  };
};

export const getItemsAction = async (dispatch: any) => {
  try {
    const items: ItemTypeApiResponse[] = await getItems();
    const parsedItems = items.map((item: ItemTypeApiResponse) => ({...item, price: parseFloat(item.price)}))
    dispatch({ type: GET_ITEMS, payload: parsedItems });
  } catch (error) {
    if(typeof error === 'string'){
      dispatch(notificationAction("error", error));
    }
  }
};

export const getCurrencyRate = async (
  dispatch: any,
  currency: string = USD
) => {
  try {
    dispatch(displayLoadingLayer(true));
    const rate = await getRates(currency);
    dispatch(displayLoadingLayer(false));
    dispatch({
      type: SET_CURRENCY,
      payload: {
        currency,
        rate: myRound(rate),
        //+(Math.round(parseFloat(rate + "e+2")) + "e-2"),
      },
    });
  } catch (error) {
    if(typeof error === 'string'){
      dispatch(notificationAction("error", error));
    }
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
    if(typeof error === 'string'){
      dispatch(notificationAction("error", error));
    }
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
