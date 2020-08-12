import { ItemType, OrderData, Currency } from "../types";
import axios from "axios";

export const makeOrder = async (data: OrderData) => {
  const url =
    process.env.REACT_APP_API_URL && process.env.REACT_APP_API_ORDER
      ? process.env.REACT_APP_API_URL + process.env.REACT_APP_API_ORDER
      : "http://pizza-task.test/api/order";
  const response = await axios.post(`${url}`, data);
  console.log({ response });
  return response;
};

/**
 * Normally, the base would be EUR and the rate we are looking for is USD
 */
export const getRates = async (currency: string) => {
  const url = process.env.REACT_APP_API_CURRENCY
    ? process.env.REACT_APP_API_CURRENCY
    : "https://api.exchangeratesapi.io/latest";
  try {
    const response = await axios.get(url);
    if (response.data && response.data.rates) {
      return response.data.rates[currency];
    }
  } catch (error) {
    console.log(
      "An error occur while trying to get the current exchange: ",
      error
    );
  }
  return 0;
};

export const myRound = (x: number) => {
  return Math.round((x + Number.EPSILON) * 100) / 100;
};

export const getItems = async () => {
  const url =
    process.env.REACT_APP_API_URL && process.env.REACT_APP_API_ITEMS
      ? process.env.REACT_APP_API_URL + process.env.REACT_APP_API_ITEMS
      : "http://pizza-task.test/api/items";
  try {
    const response = await axios.get(url);
    if (response.data && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("An error occur while trying to get the items: ", error);
  }
};

export const Items: ItemType[] = [
  {
    id: 1,
    name: "Marguerita",
    ingredients: "Tomato sauce, mozzarella, basil, oregano and olive oil.",
    price: 10,
    currency: Currency.EUR,
  },
  {
    id: 2,
    name: "Napolitana",
    ingredients:
      "Tomato sauce, mozzarella, anchovies, oregano, capers and olive oil.",
    price: 10,
    currency: Currency.EUR,
  },
  {
    id: 3,
    name: "Pepperoni",
    ingredients: "Tomato sauce, mozzarella, salami pepperoni.",
    price: 8,
    currency: Currency.EUR,
  },
  {
    id: 4,
    name: "Four cheeses",
    ingredients: "Tomato sauce, mozzarella, fontina,  gorgonzola, parmesan.",
    price: 12,
    currency: Currency.EUR,
  },
  {
    id: 5,
    name: "Four Seasons",
    ingredients:
      "Tomato sauce, Artichokes, olives with tomato and basil, mushrooms, Serrano ham.",
    price: 12,
    currency: Currency.EUR,
  },
  {
    id: 6,
    name: "Diávola",
    ingredients:
      "Tomato sauce, chorizo, salami, spicy chili and a generous quantity of cheese.",
    price: 10,
    currency: Currency.EUR,
  },
  {
    id: 7,
    name: "Carbonara",
    ingredients: "egg, parmesan cheese, onion, bacon, salt and pepper.",
    price: 9,
    currency: Currency.EUR,
  },
  {
    id: 8,
    name: "Funghi",
    ingredients: "Tomato sauce, mozzarella and Portobello's mushrooms.",
    price: 10,
    currency: Currency.EUR,
  },
  {
    id: 9,
    name: "Mexican",
    ingredients: "Tomato sauce, mozzarella, beans, chorizo ​​and jalapeños",
    price: 10,
    currency: Currency.EUR,
  },
];
