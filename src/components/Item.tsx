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
import { ItemTypeOrder, Sizes } from "../types";
import { USD } from "../constants";
import { myRound, showTwoDecimalsStrict } from "../resources";

type ItemProps = ItemType & { filterSize: Sizes; quantity: number };

const Item = ({
  id,
  name,
  ingredients,
  image_url,
  size,
  price,
  currency,
  quantity,
  filterSize,
}: ItemProps) => {
  const [animate, setAnimate] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const dispatch = useDispatch();
  const orderReducer = useSelector((state: RootState) => state.orderReducer);
  const actualCurrency = orderReducer?.actualCurrency;
  const exchangeRate = orderReducer?.exchangeRate
    ? orderReducer.exchangeRate.rate
    : 0;

  const renderRemoveButton = () => {
    if (quantity > 0) {
      return (
        <RemoveButton
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => dispatch(removeItem(id))}
        />
      );
    }
    return <RemoveButton onTouchStart={(e) => e.stopPropagation()} disabled />;
  };
  const renderPrice = () => {
    if (actualCurrency === USD) {
      return <h4>${showTwoDecimalsStrict(myRound(price * exchangeRate))}</h4>;
    }
    return <h4>€{showTwoDecimalsStrict(price)}</h4>;
  };

  const renderInnerinteraction = () => {
    if (quantity > 0) {
      return (
        <>
          {renderRemoveButton()}
          <ItemQuantity>{quantity}</ItemQuantity>
          <AddButton
            onTouchEnd={(e) => e.stopPropagation()}
            onClick={() => dispatch(addItem(id))}
          />
        </>
      );
    }
    return (
      <AddButton
        onTouchEnd={(e) => e.stopPropagation()}
        onClick={() => dispatch(addItem(id))}
      />
    );
  };

  return (
    <ItemContainer
      displayItem={size === filterSize}
      itemImg={image_url}
      onTouchEnd={(e) => {
        const newTime = new Date();
        const dif = newTime.getTime() - time.getTime();
        if (dif < 100) {
          setAnimate(!animate);
        }
      }}
      onTouchStart={(e) => setTime(new Date())}
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
            {renderInnerinteraction()}
          </ItemInteraction>
        )}
      </Transition>
    </ItemContainer>
  );
};

export default React.memo(Item);
