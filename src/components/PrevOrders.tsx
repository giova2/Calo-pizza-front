import React from "react";
import {
  OrdersMade,
  Panel,
  PanelTable,
  PizzaImg,
  PanelLayer,
  PanelHeader,
  ClosePanel,
  Close,
} from "../styledComponents/HeaderItem";
import { OrderData } from "../types";
import pizzaSVG from "../assets/images/pizza.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { displayPrevOrdersAction } from "../actions";
import PrevOrdersItemsList from "./PrevOrdersItemsList";

export default function PrevOrders() {
  const orderReducer = useSelector((state: RootState) => state.orderReducer);
  const PrevOrdersLayer = React.useRef(null);
  const displayPrevOrders = orderReducer
    ? orderReducer.displayPrevOrders
    : false;
  const orders = orderReducer ? orderReducer.orders : [];
  const dispatch = useDispatch();
  const renderPanel = () => {
    if (displayPrevOrders) {
      return (
        <PanelLayer
          ref={PrevOrdersLayer}
          onClick={(e) =>
            e.target === PrevOrdersLayer?.current &&
            dispatch(displayPrevOrdersAction(false))
          }
        >
          <Panel>
            <ClosePanel>
              <Close onClick={(e) => dispatch(displayPrevOrdersAction(false))}>
                &times;
              </Close>
            </ClosePanel>
            <PanelHeader>
              <span>Your Recent Orders</span>
            </PanelHeader>
            <div style={{ overflow: "auto" }}>
              <PanelTable>
                <thead>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Items</th>
                  <th>Currency</th>
                  <th>Total</th>
                </thead>
                <tbody>
                  {orders.map((order: OrderData) => {
                    return (
                      <tr key={order.total + Math.random()}>
                        <td>{order.name} </td>
                        <td>{order.contact} </td>
                        <td>{order.address} </td>
                        <td>
                          <PrevOrdersItemsList items={order.items} />
                        </td>
                        <td>{order.currency} </td>
                        <td>{order.total} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </PanelTable>
            </div>
          </Panel>
        </PanelLayer>
      );
    }
    return (
      <PizzaImg
        src={pizzaSVG}
        onClick={() => dispatch(displayPrevOrdersAction(true))}
      />
    );
  };
  return (
    <OrdersMade visible={orders && orders.length > 0}>
      {renderPanel()}
    </OrdersMade>
  );
}
