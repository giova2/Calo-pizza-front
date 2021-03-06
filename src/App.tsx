import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./styledComponents/Theme";
import Header from "./components/Header";
import Order from "./components/Order";
import ItemList from "./components/ItemList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./reducers";
import { Items } from "./resources";
import {
  getCurrencyRate,
  getItemsAction,
  notificationAction,
  recoverOrder,
} from "./actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { TypeOrderReducer, Currency } from "./types";

import "./App.css";

function App() {
  const orderReducer: TypeOrderReducer = useSelector(
    (state: RootState) => state.orderReducer
  );
  const display: boolean = orderReducer.display ? orderReducer.display : false;
  const displayLoadingLayer = orderReducer.displayLoadingLayer;
  const notification = orderReducer.notification;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (notification && notification.type !== null) {
      notification.type === "error" && toast.error(notification.message);
      notification.type === "ok" && toast.success(notification.message);
      notification.type === "warn" && toast.warn(notification.message);
    }
    if (orderReducer.itemsOrder.length === 0) {
      dispatch(recoverOrder());
    }
    if (
      orderReducer.actualCurrency !== Currency.EUR &&
      orderReducer.exchangeRate.currency === Currency.EUR
    ) {
      getCurrencyRate(dispatch);
    }
    if (orderReducer.items.length === 0 || orderReducer.items === Items) {
      getItemsAction(dispatch);
    }
    return () => {
      dispatch(notificationAction(null, null));
    };
  }, [notification?.message, orderReducer.actualCurrency]);

  const renderToast = () => {
    return (
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    );
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {renderToast()}
        <Loading show={displayLoadingLayer} />
        <Order show={display} />
        <Header />
        <ItemList />
      </ThemeProvider>
    </div>
  );
}

export default App;
