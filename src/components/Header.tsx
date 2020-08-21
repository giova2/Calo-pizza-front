import React from "react";
import { HeaderContainer } from "../styledComponents/HeaderContainer";
import { HeaderItem } from "../styledComponents/HeaderItem";
import {
  CurrencyContainer,
  Currency,
} from "../styledComponents/HeaderItemThird";
import { OrderTableHoverContainer } from "../styledComponents/HeaderItemSecond";
import GoogleOAuth from "./GoogleAuth.js";

import {
  ShoppingCartButton,
  ShoppingCartImg,
} from "../styledComponents/HeaderItemSecond";

import ShoppingCartSVG from "../assets/images/shopping_cart2.svg";
import DollarSVG from "../assets/images/dollar.svg";
import DollarSVGColored from "../assets/images/dollar_colored.svg";
import EuroSVG from "../assets/images/euro.svg";
import EuroSVGColored from "../assets/images/euro_colored.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { displayOrderPanel, setActualCurrency } from "../actions";
import { USD, EUR } from "../constants";
import PrevOrders from "./PrevOrders";
import OrderTableComponent from "./OrderTableComponent";

const Header = () => {
  const [displayTable, setDisplayTable] = React.useState(false);
  const [hoveringTable, setHoveringTable] = React.useState(false);
  const orderReducer = useSelector((state: RootState) => state.orderReducer);
  const itemsOrder = orderReducer?.itemsOrder;
  const actualCurrency = orderReducer?.actualCurrency;
  const dispatch = useDispatch();
  const quantity =
    itemsOrder && itemsOrder.length > 0
      ? itemsOrder
          ?.map((item) => {
            return item.quantity;
          })
          .reduce((total, num) => total + num)
      : 0;

  return (
    <HeaderContainer>
      <PrevOrders />
      <HeaderItem>
        {process.env.REACT_APP_APP_NAME?.replace("_", " ")}
      </HeaderItem>
      <HeaderItem>
        <ShoppingCartButton
          quantity={quantity}
          onMouseOver={() => {
            setDisplayTable(true);
            setHoveringTable(true);
          }}
          onMouseDown={() => {
            setDisplayTable(false);
            setHoveringTable(false);
          }}
          onTouchEnd={() => setHoveringTable(false)}
          onMouseLeave={() => {
            setDisplayTable(false);
            setHoveringTable(false);
          }}
        >
          <ShoppingCartImg
            animate={orderReducer?.display !== true}
            visible={itemsOrder && itemsOrder.length > 0}
            src={ShoppingCartSVG}
            onClick={(e) => dispatch(displayOrderPanel(true))}
          />
        </ShoppingCartButton>
        <OrderTableHoverContainer>
          <OrderTableComponent
            display={displayTable}
            isHovering={hoveringTable}
          />
        </OrderTableHoverContainer>
      </HeaderItem>
      <HeaderItem itemsCentered>
        <CurrencyContainer>
          <Currency
            selected={actualCurrency === USD}
            src={actualCurrency === USD ? DollarSVGColored : DollarSVG}
            onClick={() => dispatch(setActualCurrency(USD))}
            alt="USD"
          />
          <Currency
            selected={actualCurrency === EUR}
            src={actualCurrency === EUR ? EuroSVGColored : EuroSVG}
            onClick={() => dispatch(setActualCurrency(EUR))}
            alt="EUR"
          />
        </CurrencyContainer>
        <GoogleOAuth />
      </HeaderItem>
    </HeaderContainer>
  );
};

export default Header;
