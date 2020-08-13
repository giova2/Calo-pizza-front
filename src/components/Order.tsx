import React, { useEffect, FunctionComponent } from "react";
import { Transition } from "react-transition-group";
import {
  OrderPanelContainer,
  OrderPanel,
  OrderClosePanel,
  Close,
  OrderHeader,
  OrderInfo,
  OrderTable,
  OrderTableBody,
  OrderItem,
  OrderItemProperty,
} from "../styledComponents/OrderPanel";
import { AddButtonTable, RemoveButtonTable } from "../styledComponents/Item";

import {
  displayOrderPanel,
  notificationAction,
  makeOrderAction,
  removeItem,
  addItem,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { myRound } from "../resources";

import OrderForm from "./OrderForm";
import { ItemTypeOrder, OrderData, OrderItemEnum } from "../types";
import { USD } from "../constants";

type TOrderProps = {
  show: boolean;
};

const Order: FunctionComponent<TOrderProps> = ({ show }) => {
  const [animate, setAnimate] = React.useState(show);
  const OrderContainer = React.useRef(null);
  const orderReducer = useSelector((state: RootState) => state.orderReducer);
  const items: ItemTypeOrder[] | undefined =
    orderReducer && orderReducer.itemsOrder
      ? orderReducer.itemsOrder
      : undefined;
  const actualCurrency = orderReducer?.actualCurrency;
  const exchangeRate = orderReducer?.exchangeRate?.rate;
  const total = orderReducer?.total;
  const totalExpressedInActualCurrency =
    total && actualCurrency === USD ? myRound(total * exchangeRate) : total;
  let subtotal = 0;
  const dispatch = useDispatch();
  useEffect(() => {
    setAnimate(show);
  }, [show]);

  const handleSubmitOrder = async (formValues: any) => {
    console.log({ formValues });
    const dataItems: ItemTypeOrder[] = items ? [...items] : [];

    const newOrder: OrderData = {
      items: dataItems,
      name: formValues.name,
      contact: formValues.contact,
      address: formValues.address,
      currency: actualCurrency,
      total: totalExpressedInActualCurrency
        ? totalExpressedInActualCurrency
        : -1,
    };
    console.log({ newOrder });

    let response = { success: true };
    try {
      await makeOrderAction(dispatch, newOrder); // apiLaravel,
    } catch (error) {
      console.log({ error });
      response = { success: false };
      dispatch(notificationAction("error", error.message));
    }
    return response;
  };
  const renderRemoveButton = (item: ItemTypeOrder) => {
    if (item.quantity > 0) {
      return (
        <RemoveButtonTable
          onClick={() => dispatch(removeItem(item.id, false))}
        />
      );
    }
    return <RemoveButtonTable disabled />;
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
                <OrderInfo>
                  <OrderTable>
                    <OrderTableBody>
                      <OrderItem type={OrderItemEnum.header}>
                        <OrderItemProperty type={OrderItemEnum.header}>
                          Name
                        </OrderItemProperty>
                        <OrderItemProperty type={OrderItemEnum.header}>
                          Quantity
                        </OrderItemProperty>
                        <OrderItemProperty type={OrderItemEnum.header}>
                          Amount
                        </OrderItemProperty>
                      </OrderItem>
                      {items?.map((item) => {
                        if (item) {
                          let itemSubtotal = "";
                          if (actualCurrency === USD) {
                            const tmpSubtotal =
                              item.price * item.quantity * exchangeRate;
                            subtotal += tmpSubtotal;
                            itemSubtotal = `$${myRound(tmpSubtotal)}`;
                          } else {
                            const tmpSubtotal = item.price * item.quantity;
                            subtotal += tmpSubtotal;
                            itemSubtotal = `€${tmpSubtotal}`;
                          }
                          return (
                            <OrderItem type={OrderItemEnum.item} key={item.id}>
                              <OrderItemProperty>{item.name}</OrderItemProperty>
                              <OrderItemProperty flex>
                                {renderRemoveButton(item)}
                                {item.quantity}
                                <AddButtonTable
                                  onClick={() =>
                                    dispatch(addItem(item.id, false))
                                  }
                                />
                              </OrderItemProperty>
                              <OrderItemProperty>
                                {itemSubtotal}
                              </OrderItemProperty>
                            </OrderItem>
                          );
                        }
                      })}
                      <OrderItem type={OrderItemEnum.subtotal}>
                        <OrderItemProperty>Subtotal</OrderItemProperty>
                        <OrderItemProperty></OrderItemProperty>
                        <OrderItemProperty>{`${
                          actualCurrency === USD ? "$" : "€"
                        }${myRound(subtotal)}`}</OrderItemProperty>
                      </OrderItem>
                      <OrderItem type={OrderItemEnum.fees}>
                        <OrderItemProperty>Delivery fee</OrderItemProperty>
                        <OrderItemProperty></OrderItemProperty>
                        <OrderItemProperty>{`${
                          actualCurrency === USD
                            ? "$" + myRound(10 * exchangeRate)
                            : "€10"
                        }`}</OrderItemProperty>
                      </OrderItem>
                      <OrderItem type={OrderItemEnum.total}>
                        <OrderItemProperty type={OrderItemEnum.total}>
                          TOTAL
                        </OrderItemProperty>
                        <OrderItemProperty
                          type={OrderItemEnum.total}
                        ></OrderItemProperty>
                        <OrderItemProperty type={OrderItemEnum.total}>{`${
                          actualCurrency === USD ? "$" : "€"
                        }${totalExpressedInActualCurrency}`}</OrderItemProperty>
                      </OrderItem>
                    </OrderTableBody>
                  </OrderTable>
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
