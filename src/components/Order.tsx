import React, { useEffect, FunctionComponent } from "react";
import { Transition } from "react-transition-group";
import {
  OrderPanelContainer,
  OrderPanel,
  OrderClosePanel,
  Close,
  Clear,
  OrderHeader,
  OrderInfo,
} from "../styledComponents/OrderPanel";

import {
  displayOrderPanel,
  notificationAction,
  makeOrderAction,
  clearOrderAction,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { myRound } from "../resources";

import OrderForm from "./OrderForm";
import { ItemTypeOrder, OrderData, Status } from "../types";
import { USD } from "../constants";
import OrderTableComponent from "./OrderTableComponent";

type TOrderProps = {
  show: boolean;
};

const Order: FunctionComponent<TOrderProps> = ({ show }) => {
  const [animate, setAnimate] = React.useState(show);
  const OrderContainer = React.useRef(null);
  const state = useSelector((state: RootState) => state);
  const orderReducer = state.orderReducer;
  const auth = state.auth;
  const items: ItemTypeOrder[] | undefined =
    orderReducer && orderReducer.itemsOrder
      ? orderReducer.itemsOrder
      : undefined;
  const actualCurrency = orderReducer?.actualCurrency;
  const exchangeRate = orderReducer?.exchangeRate?.rate;
  const total = orderReducer?.total;
  const totalExpressedInActualCurrency =
    total && actualCurrency === USD ? myRound(total * exchangeRate) : total;
  const dispatch = useDispatch();
  useEffect(() => {
    setAnimate(show);
  }, [show]);

  const handleSubmitOrder = async (formValues: any) => {
    const dataItems: ItemTypeOrder[] = items ? [...items] : [];

    const newOrder: OrderData = {
      items: dataItems,
      created_at: new Date(),
      name: formValues.name,
      contact: formValues.contact,
      address: formValues.address,
      currency: actualCurrency,
      status: Status.pending,
      total: totalExpressedInActualCurrency
        ? totalExpressedInActualCurrency
        : -1,
    };
    console.log({ newOrder });

    let response = { success: true };
    const userId = auth.userId;
    try {
      await makeOrderAction(dispatch, newOrder, userId); // apiLaravel,
    } catch (error) {
      console.log({ error });
      response = { success: false };
      dispatch(notificationAction("error", error.message));
    }
    return response;
  };

  const renderOrder = (a: boolean) => {
    if (a) {
      return (
        <OrderPanelContainer
          ref={OrderContainer}
          onClick={(e) =>
            e.target === OrderContainer?.current &&
            dispatch(displayOrderPanel(false))
          }
        >
          <Transition in={a} timeout={500}>
            {(state: any) => (
              <OrderPanel state={state}>
                <OrderClosePanel>
                  <Close
                    onClick={(e) => dispatch(displayOrderPanel(false))}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </Close>
                </OrderClosePanel>
                <OrderHeader>
                  <span>Your Order</span>
                </OrderHeader>
                <Clear
                  onClick={() =>
                    dispatch(clearOrderAction()) &&
                    dispatch(displayOrderPanel(false))
                  }
                >
                  Clear Order
                </Clear>
                <OrderInfo>
                  <OrderTableComponent />
                  <OrderForm itemsOrder={items} onSubmit={handleSubmitOrder} />
                </OrderInfo>
              </OrderPanel>
            )}
          </Transition>
        </OrderPanelContainer>
      );
    }
    return <></>;
  };
  return renderOrder(animate);
};

export default Order;
