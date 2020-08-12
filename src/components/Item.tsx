import React from "react";
import { ItemType } from "../types";
import {
  ItemContainer,
  ItemTop,
  ItemMiddle,
  ItemBottom,
  ItemInteraction,
  ItemQuantity,
  AddButton,
  RemoveButton,
} from "../styledComponents/Item";
import { Transition } from "react-transition-group";
import { addItem, removeItem } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { ItemTypeOrder } from "../types";
import { USD } from "../constants";
import { myRound } from "../resources";

const Item = ({ id, name, ingredients, price, currency }: ItemType) => {
  const [animate, setAnimate] = React.useState(false);
  const dispatch = useDispatch();
  const orderReducer = useSelector((state: RootState) => state.orderReducer);
  const item: ItemTypeOrder | undefined =
    orderReducer && orderReducer.itemsOrder
      ? orderReducer.itemsOrder.find((item: ItemTypeOrder) => item.id === id)
      : undefined;
  const actualCurrency = orderReducer?.actualCurrency;
  const exchangeRate = orderReducer?.exchangeRate
    ? orderReducer.exchangeRate.rate
    : 0;
  const renderRemoveButton = () => {
    if (item && item.quantity > 0) {
      return (
        <RemoveButton
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onClick={() => dispatch(removeItem(id))}
        />
      );
    }
    return (
      <RemoveButton
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        disabled
      />
    );
  };
  const renderPrice = () => {
    if (actualCurrency === USD) {
      return <h4>${myRound(price * exchangeRate)}</h4>;
    }
    return <h4>€{price}</h4>;
  };

  return (
    <ItemContainer
      onTouchStart={(e) => {
        setAnimate(!animate);
      }}
      onMouseEnter={() => {
        setAnimate(true);
      }}
      onMouseLeave={() => {
        setAnimate(false);
      }}
    >
      <ItemTop>
        <h2>{name}</h2>
      </ItemTop>
      <ItemMiddle>{renderPrice()}</ItemMiddle>
      <ItemBottom>
        <span>{ingredients}</span>
      </ItemBottom>
      <Transition in={animate} timeout={500}>
        {(state: any) => (
          // state change: exited -> entering -> entered -> exiting -> exited
          <ItemInteraction state={state}>
            <AddButton
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onClick={() => dispatch(addItem(id))}
            />
            <ItemQuantity>
              {item && item.quantity ? item.quantity : 0}
            </ItemQuantity>
            {renderRemoveButton()}
          </ItemInteraction>
        )}
      </Transition>
    </ItemContainer>
  );
};

export default Item;
