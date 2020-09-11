import React, { FunctionComponent } from "react";
import {
  OrderTable,
  OrderTableBody,
  OrderItem,
  OrderItemProperty,
} from "../styledComponents/OrderTable";
import { OrderItemEnum, ItemTypeOrder, TypeOrderReducer } from "../types";
import { addItem, removeItem, deleteItem, displayOrderPanel } from "../actions";
import { AddButtonTable, RemoveButtonTable } from "../styledComponents/Item";
import { myRound, showTwoDecimalsStrict } from "../resources";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { USD } from "../constants";

type TOrderTableProps = {
  display?: boolean;
  isHovering?: boolean;
};

const OrderTableComponent: FunctionComponent<TOrderTableProps> = ({
  display,
  isHovering,
}) => {
  const state = useSelector((state: RootState) => state);
  const orderReducer: TypeOrderReducer = state.orderReducer;
  const items: ItemTypeOrder[] | undefined =
    orderReducer && orderReducer.itemsOrder
      ? orderReducer.itemsOrder
      : undefined;
  const actualCurrency = orderReducer.actualCurrency;
  const exchangeRate = orderReducer.exchangeRate.rate;
  const total = orderReducer.total;
  const totalExpressedInActualCurrency =
    total && actualCurrency === USD ? myRound(total * exchangeRate) : total;
  const dispatch = useDispatch();
  let subtotal = 0;
  const renderRemoveButton = (item: ItemTypeOrder) => {
    if (item.quantity > 0 && !isHovering) {
      return (
        <RemoveButtonTable
          onClick={() => {
            if (items?.length === 1 && item.quantity === 1) {
              dispatch(displayOrderPanel(false));
            }
            dispatch(removeItem(item.id, false));
          }}
        />
      );
    }
  };
  const renderAddButton = (item: ItemTypeOrder) =>
    !isHovering && (
      <AddButtonTable onClick={() => dispatch(addItem(item.id, false))} />
    );

  const renderTable = () => {
    if (display === false) {
      return <></>;
    }
    return (
      <OrderTable>
        <OrderTableBody>
          <OrderItem type={OrderItemEnum.header}>
            <OrderItemProperty type={OrderItemEnum.header}>
              Name
            </OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.header}>
              Size
            </OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.header}>
              Quantity
            </OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.header}>
              Amount
            </OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.header}></OrderItemProperty>
          </OrderItem>
          {items?.map((item) => {
            if (item) {
              let itemSubtotal = "";
              if (actualCurrency === USD) {
                const tmpSubtotal = item.price * item.quantity * exchangeRate;
                subtotal += tmpSubtotal;
                itemSubtotal = `$${showTwoDecimalsStrict(
                  myRound(tmpSubtotal)
                )}`;
              } else {
                const tmpSubtotal = item.price * item.quantity;
                subtotal += tmpSubtotal;
                itemSubtotal = `€${showTwoDecimalsStrict(tmpSubtotal)}`;
              }
              return (
                <OrderItem type={OrderItemEnum.item} key={item.id}>
                  <OrderItemProperty>{item.name}</OrderItemProperty>
                  <OrderItemProperty>{item.size}</OrderItemProperty>
                  <OrderItemProperty flex>
                    {renderRemoveButton(item)}
                    {item.quantity}
                    {renderAddButton(item)}
                  </OrderItemProperty>
                  <OrderItemProperty>{itemSubtotal}</OrderItemProperty>
                  <OrderItemProperty
                    onClick={() => dispatch(deleteItem(item.id, items.length))}
                    style={{ cursor: "pointer" }}
                  >
                    {!isHovering && <strong>X</strong>}
                  </OrderItemProperty>
                </OrderItem>
              );
            }
          })}
          <OrderItem type={OrderItemEnum.subtotal}>
            <OrderItemProperty>Subtotal</OrderItemProperty>
            <OrderItemProperty></OrderItemProperty>
            <OrderItemProperty></OrderItemProperty>
            <OrderItemProperty>{`${
              actualCurrency === USD ? "$" : "€"
            }${showTwoDecimalsStrict(myRound(subtotal))}`}</OrderItemProperty>
            <OrderItemProperty></OrderItemProperty>
          </OrderItem>
          <OrderItem type={OrderItemEnum.fees}>
            <OrderItemProperty>Delivery fee</OrderItemProperty>
            <OrderItemProperty></OrderItemProperty>
            <OrderItemProperty></OrderItemProperty>
            <OrderItemProperty>{`${
              actualCurrency === USD
                ? "$" + showTwoDecimalsStrict(myRound(10 * exchangeRate))
                : "€10"
            }`}</OrderItemProperty>
            <OrderItemProperty></OrderItemProperty>
          </OrderItem>
          <OrderItem type={OrderItemEnum.total}>
            <OrderItemProperty type={OrderItemEnum.total}>
              TOTAL
            </OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.total}></OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.total}></OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.total}>{`${
              actualCurrency === USD ? "$" : "€"
            }${showTwoDecimalsStrict(
              totalExpressedInActualCurrency
            )}`}</OrderItemProperty>
            <OrderItemProperty type={OrderItemEnum.total}></OrderItemProperty>
          </OrderItem>
        </OrderTableBody>
      </OrderTable>
    );
  };

  return renderTable();
};

export default OrderTableComponent;
