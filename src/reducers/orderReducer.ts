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
  GET_ORDERS,
  CLEAR_ORDER,
  DISPLAY_PREV_ORDERS,
  DISPLAY_LOADING_LAYER,
  RECOVER_ORDER,
  RECOVER_LAST_ORDERS,
  reduxAction,
} from "../actions/types";
import { Items, localStorageManipulation } from "../resources";
import {
  ItemType,
  ItemTypeOrder,
  TypeOrderReducer,
  LocalStorageActions,
  Currency,
} from "../types";
import { DELIVERY_FEE, LOCAL_STORAGE_KEYS } from "../constants";

const actCurr = localStorageManipulation(
  LocalStorageActions.GET,
  LOCAL_STORAGE_KEYS.currentCurrency
);

const INITIAL_STATE: TypeOrderReducer = {
  display: false,
  items: Items,
  itemsOrder: [],
  actualCurrency:
    actCurr === null || actCurr === undefined ? Currency.EUR : Currency.USD,
  exchangeRate: { currency: Currency.EUR, rate: 1 },
  total: DELIVERY_FEE,
  notification: {
    type: null,
    message: null,
  },
  orders: [],
  displayPrevOrders: false,
  displayLoadingLayer: false,
};

export default (state = INITIAL_STATE, action: reduxAction) => {
  const { itemsOrder, items } = state;
  const tmpItem: ItemType | undefined = items.find(
    (item) => item.id === action.payload
  );
  switch (action.type) {
    case ADD_ITEM:
      if (tmpItem) {
        let returnItemsOrder: ItemTypeOrder[] = [];
        let newState = {};
        let newTotal = 0;
        const newItems: ItemTypeOrder[] = [];
        itemsOrder.forEach((obj) => newItems.push({ ...obj }));
        const existed_item: ItemTypeOrder | undefined = newItems.find(
          (item) => action.payload === item.id
        );
        
        if (existed_item) {
          existed_item.quantity += 1;
          returnItemsOrder = newItems;
          newTotal = state.total + existed_item.price;
          newState = {
            ...state,
            itemsOrder: returnItemsOrder,
            total: newTotal,
          };
        } else {
          const newItem: ItemTypeOrder = { ...tmpItem, quantity: 1 };
          returnItemsOrder = [...itemsOrder, newItem];
          newTotal = state.total + newItem.price;
          newState = {
            ...state,
            itemsOrder: returnItemsOrder,
            total: newTotal,
          };
        }
        localStorageManipulation(
          LocalStorageActions.SET,
          LOCAL_STORAGE_KEYS.currentOrderItems,
          JSON.stringify(returnItemsOrder)
        );
        localStorageManipulation(
          LocalStorageActions.SET,
          LOCAL_STORAGE_KEYS.currentTotal,
          newTotal.toString()
        );
        return newState;
      }
      break;
    case REMOVE_ITEM:
      if (tmpItem) {
        let returnItemsOrder: ItemTypeOrder[] = [];
        let newState = {};
        let newTotal = 0;
        const newItems: ItemTypeOrder[] = [];
        itemsOrder.forEach((obj) => newItems.push({ ...obj }));
        const existed_item: ItemTypeOrder | undefined = newItems.find(
          (item) => action.payload === item.id
        );
        if (existed_item) {
          existed_item.quantity -= 1;
          if (existed_item.quantity === 0) {
            const newItemsWithoutItem = [...newItems].filter(
              (elem: ItemTypeOrder) => elem.id !== existed_item.id
            );
            returnItemsOrder = newItemsWithoutItem;
            newTotal = state.total - existed_item.price;
            newState = {
              ...state,
              itemsOrder: returnItemsOrder,
              total: newTotal,
            };
          } else {
            returnItemsOrder = newItems;
            newTotal = state.total - existed_item.price;
            newState = {
              ...state,
              itemsOrder: newItems,
              total: newTotal,
            };
          }
          localStorageManipulation(
            LocalStorageActions.SET,
            LOCAL_STORAGE_KEYS.currentOrderItems,
            JSON.stringify(returnItemsOrder)
          );
          localStorageManipulation(
            LocalStorageActions.SET,
            LOCAL_STORAGE_KEYS.currentTotal,
            newTotal.toString()
          );
          return newState;
        }
      }
      break;
    case DELETE_ITEM:
      if (tmpItem) {
        let returnItemsOrder: ItemTypeOrder[] = [];
        let newState = {};
        let newTotal = 0;
        const newItems: ItemTypeOrder[] = [];
        itemsOrder.forEach((obj) => newItems.push({ ...obj }));
        const existed_item: ItemTypeOrder | undefined = newItems.find(
          (item) => action.payload === item.id
        );
        if (existed_item) {
          const newItemsWithoutItem = [...newItems].filter(
            (elem: ItemTypeOrder) => elem.id !== existed_item.id
          );
          returnItemsOrder = newItemsWithoutItem;
          newTotal = state.total - existed_item.price * existed_item.quantity;
          newState = {
            ...state,
            itemsOrder: newItemsWithoutItem,
            total: newTotal,
          };
        }
        localStorageManipulation(
          LocalStorageActions.SET,
          LOCAL_STORAGE_KEYS.currentOrderItems,
          JSON.stringify(returnItemsOrder)
        );
        localStorageManipulation(
          LocalStorageActions.SET,
          LOCAL_STORAGE_KEYS.currentTotal,
          newTotal.toString()
        );
        return newState;
      }
      break;
    case SET_CURRENCY:
      const { currency, rate } = action.payload;
      return { ...state, exchangeRate: { currency, rate } };
    case SET_ACTUAL_CURRENCY:
      localStorageManipulation(
        LocalStorageActions.SET,
        LOCAL_STORAGE_KEYS.currentCurrency,
        action.payload
      );
      return { ...state, actualCurrency: action.payload };
    case DISPLAY_ORDER_PANEL:
      return { ...state, display: action.payload };
    case GET_ITEMS:
      return { ...state, items: action.payload };
    case NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case MAKE_ORDER:
      localStorage.removeItem(LOCAL_STORAGE_KEYS.currentOrderItems);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.currentTotal);
      const newOrder = { ...action.payload, items: state.itemsOrder };
      const newOrders = [...state.orders, newOrder];
      localStorageManipulation(
        LocalStorageActions.SET,
        LOCAL_STORAGE_KEYS.lastOrders,
        JSON.stringify(newOrders)
      );
      return {
        ...state,
        orders: newOrders,
        itemsOrder: [],
        total: DELIVERY_FEE,
      };
    case GET_ORDERS:
      localStorage.removeItem(LOCAL_STORAGE_KEYS.lastOrders);
      const itemOrders = action.payload.map(({ order, items }: any) => {
        return { ...order, items };
      });
      const getOrderslastOrders = [...state.orders, ...itemOrders];
      return {
        ...state,
        orders: getOrderslastOrders,
      };
    case RECOVER_ORDER:
      const orderItems = localStorageManipulation(
        LocalStorageActions.GET,
        LOCAL_STORAGE_KEYS.currentOrderItems
      );
      const totalRecovered = localStorageManipulation(
        LocalStorageActions.GET,
        LOCAL_STORAGE_KEYS.currentTotal
      );
      const cleanOrderItems =
        orderItems === null || orderItems === undefined
          ? []
          : JSON.parse(orderItems);
      const cleanTotalRecovered =
        totalRecovered === null || totalRecovered === undefined
          ? INITIAL_STATE.total
          : parseFloat(totalRecovered);
      return {
        ...state,
        itemsOrder: cleanOrderItems,
        total: cleanTotalRecovered,
      };
    case RECOVER_LAST_ORDERS:
      return { ...state, orders: action.payload };
    case DISPLAY_PREV_ORDERS:
      return { ...state, displayPrevOrders: action.payload };
    case DISPLAY_LOADING_LAYER:
      return { ...state, displayLoadingLayer: action.payload };
    case CLEAR_ORDER:
      localStorage.removeItem(LOCAL_STORAGE_KEYS.currentOrderItems);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.currentTotal);
      return { ...state, itemsOrder: [] };
    default:
      return state;
  }
};
