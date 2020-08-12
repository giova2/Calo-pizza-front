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
  reduxAction,
} from "../actions/types";
import { Items } from "../resources";
import { ItemType, ItemTypeOrder, ExchangeRate, OrderData } from "../types";
import { EUR, DELIVERY_FEE } from "../constants";

const INITIAL_STATE: {
  display: boolean;
  items: ItemType[];
  itemsOrder: ItemTypeOrder[];
  actualCurrency: string;
  exchangeRate: ExchangeRate | null;
  total: number;
  notification: {
    type: string | null;
    message: string | null;
  };
  orders: OrderData[];
  displayPrevOrders: boolean;
} = {
  display: false,
  items: [], //Items,
  itemsOrder: [],
  actualCurrency: EUR,
  exchangeRate: null,
  total: DELIVERY_FEE,
  notification: {
    type: null,
    message: null,
  },
  orders: [],
  displayPrevOrders: false,
};

export default (state = INITIAL_STATE, action: reduxAction) => {
  const { itemsOrder, items } = state;
  const tmpItem: ItemType | undefined = items.find(
    (item) => item.id === action.payload
  );
  switch (action.type) {
    case ADD_ITEM:
      if (tmpItem) {
        const newItems: ItemTypeOrder[] = [];
        itemsOrder.forEach((obj) => newItems.push({ ...obj }));
        const existed_item: ItemTypeOrder | undefined = newItems.find(
          (item) => action.payload === item.id
        );
        if (existed_item) {
          existed_item.quantity += 1;
          return {
            ...state,
            itemsOrder: newItems,
            total: state.total + existed_item.price,
          };
        } else {
          const newItem: ItemTypeOrder = { ...tmpItem, quantity: 1 };
          return {
            ...state,
            itemsOrder: [...itemsOrder, newItem],
            total: state.total + newItem.price,
          };
        }
      }
      break;
    case REMOVE_ITEM:
      if (tmpItem) {
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
            return {
              ...state,
              itemsOrder: newItemsWithoutItem,
              total: state.total - existed_item.price,
            };
          }
          return {
            ...state,
            itemsOrder: newItems,
            total: state.total - existed_item.price,
          };
        }
      }
      break;
    case SET_CURRENCY:
      const { currency, rate } = action.payload;
      return { ...state, exchangeRate: { currency, rate } };
    case SET_ACTUAL_CURRENCY:
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
      return {
        ...state,
        orders: [
          ...state.orders,
          { ...action.payload, items: state.itemsOrder },
        ],
        itemsOrder: [],
        total: DELIVERY_FEE,
      };
    case DISPLAY_PREV_ORDERS:
      return { ...state, displayPrevOrders: action.payload };
    default:
      return state;
  }
};
