import { ItemType, OrderData, Currency, Sizes } from "../types";
import axios from "axios";

export const createNewApiUser = async (userGapiObject: any) => {
  const apiUserData = {
    id: userGapiObject.getId(),
    name: userGapiObject.getBasicProfile().getGivenName(),
    lastname: userGapiObject.getBasicProfile().getFamilyName(),
    email: userGapiObject.getBasicProfile().getEmail(),
    avatar: userGapiObject.getBasicProfile().getImageUrl(),
  };

  await axios.post<any>(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_USERS}`,
    apiUserData
  );
};

export const getOrders = async (userId: string) => {
  const url =
    process.env.REACT_APP_API_URL && process.env.REACT_APP_API_ORDERS
      ? process.env.REACT_APP_API_URL + process.env.REACT_APP_API_ORDERS
      : "http://pizza-task.test/api/orders";
  try {
    const response = await axios.get(`${url}/${userId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(
      "An error occur while trying to get the current exchange: ",
      error
    );
  }
};

export const makeOrder = async (data: OrderData, userId?: string) => {
  const dataSet = userId ? { ...data, user_id: userId } : data;
  const url =
    process.env.REACT_APP_API_URL && process.env.REACT_APP_API_ORDERS
      ? process.env.REACT_APP_API_URL + process.env.REACT_APP_API_ORDERS
      : "http://pizza-task.test/api/orders";
  const response = await axios.post(`${url}`, dataSet);
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

export const myRound = (x: number) => {
  return Math.round((x + Number.EPSILON) * 100) / 100;
};

/**
 * WARNING! THIS FUNCTIONS CONVERTS THE VALUE TO STRING, USE IT JUST FOR DISPLAY PURPOSES!
 * @param x
 */
export const showTwoDecimalsStrict = (x: number | undefined) => {
  if (x) {
    const str = x.toString();
    const indexComma = str.indexOf(".");
    if (indexComma !== -1) {
      //if it has decimals
      const trunqued = str.substring(0, indexComma + 3); // i cut the number after 3 places including the comma
      if (trunqued.substring(indexComma).length === 2) {
        // if the lenght of the trunqued number from the comma is equal to 2 then it means that i have just 1 cipher after the comma
        return `${trunqued}0`;
      }
      return trunqued;
    }
    return str;
  }
};

const zeroAtLeft = (someKindOfDate: number) => {
  return someKindOfDate < 10 ? `0${someKindOfDate}` : someKindOfDate;
};

export const formatDate = (d: Date) => {
  const date = new Date(d);
  return `${zeroAtLeft(date.getDate())}/${zeroAtLeft(
    date.getMonth()
  )}/${date.getFullYear()} ${zeroAtLeft(date.getHours())}:${zeroAtLeft(
    date.getMinutes()
  )}`;
};

export const Items: ItemType[] = [
  {
    id: 1,
    name: "Marguerita",
    ingredients: "Tomato sauce, mozzarella, basil, oregano and olive oil.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/VZkEl06VX7xqwYaz9hBnBF30LDNOG5ZQCA8TOsvS.jpeg",
    price: 9,
    currency: Currency.EUR,
  },
  {
    id: 2,
    name: "Napolitana",
    ingredients:
      "Tomato sauce, mozzarella, anchovies, oregano, capers and olive oil.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/UGV3DFCz9YGkgn0UT5mAB6kQqODtohBFMstD2DTM.jpeg",
    price: 9,
    currency: Currency.EUR,
  },
  {
    id: 3,
    name: "Pepperoni",
    ingredients: "Tomato sauce, mozzarella, salami pepperoni.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/VFp0W1MNfdyeaLXh5ScZ7wCw7G6xUNttQFHQokuI.jpeg",
    price: 8,
    currency: Currency.EUR,
  },
  {
    id: 4,
    name: "Four cheeses",
    ingredients: "Tomato sauce, mozzarella, fontina,  gorgonzola, parmesan.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/yR6JXBxSiUOjl5mXnlfJCKdAyLWPuuQfs9dphTf2.jpeg",
    price: 12,
    currency: Currency.EUR,
  },
  {
    id: 5,
    name: "Four Seasons",
    ingredients:
      "Tomato sauce, Artichokes, olives with tomato and basil, mushrooms, Serrano ham.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/bpAYs4dta2RbDxD0CzhqkX0e6t02avNVA2VJOyeF.jpeg",
    price: 12,
    currency: Currency.EUR,
  },
  {
    id: 6,
    name: "Diávola",
    ingredients:
      "Tomato sauce, chorizo, salami, spicy chili and a generous quantity of cheese.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/dERIxLkzOCkM4izczkovc2QjX9hcdaLNTpfF3Str.jpeg",
    price: 13,
    currency: Currency.EUR,
  },
  {
    id: 7,
    name: "Carbonara",
    ingredients: "egg, parmesan cheese, onion, bacon, salt and pepper.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/eXrrhUpgbAKvsdXfKzdE2Evh0bD0gMNfTpKZmVEO.jpeg",
    price: 9,
    currency: Currency.EUR,
  },
  {
    id: 8,
    name: "Funghi",
    ingredients: "Tomato sauce, mozzarella and Portobello's mushrooms.",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/LeDRgQUYKfoJ5aCT0cJ0U4uIpdNstRHF5G9jL1fL.jpeg",
    price: 9,
    currency: Currency.EUR,
  },
  {
    id: 9,
    name: "Mexican",
    ingredients: "Tomato sauce, mozzarella, beans, chorizo ​​and jalapeños",
    size: Sizes.small,
    image_url:
      "https://pizza-test.s3.us-east-2.amazonaws.com/itemsFiles/thumbs_medium/FKetYQZP95RdNcYZhHDaYIlDIDCRrZGeBUwTFaYS.jpeg",
    price: 10,
    currency: Currency.EUR,
  },
];
