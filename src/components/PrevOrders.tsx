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
} from "../styledComponents/HeaderItemFirst";
import { OrderData, TypeOrderReducer, TypeAuthReducer } from "../types";
import pizzaSVG from "../assets/images/pizza.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { displayPrevOrdersAction, recoverLastOrders } from "../actions";
import PrevOrdersItemsList from "./PrevOrdersItemsList";
import { formatDate } from "../resources";
type ReducerReduced = {
  auth: TypeAuthReducer;
  orderReducer: TypeOrderReducer;
};
export default function PrevOrders() {
  const { orderReducer, auth }: ReducerReduced = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const PrevOrdersLayer = React.useRef(null);
  const displayPrevOrders = orderReducer.displayPrevOrders;
  const orders = orderReducer.orders;

  React.useEffect(() => {
    if (orders.length === 0 && !auth.isSignedIn) {
      dispatch(recoverLastOrders());
    }
  }, []);

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
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>E-mail</th>
                    <th>Address</th>
                    <th>Items</th>
                    <th>Currency</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: OrderData) => {
                    return (
                      <tr key={order.total + Math.random()}>
                        <td>{formatDate(order.created_at)} </td>
                        <td>{order.name} </td>
                        <td>{order.contact} </td>
                        <td>{order.email} </td>
                        <td>{order.address} </td>
                        <td>
                          <PrevOrdersItemsList items={order.items} />
                        </td>
                        <td>{order.currency} </td>
                        <td>{order.total} </td>
                        <td>{order.status} </td>
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
