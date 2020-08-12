import React from "react";
// import { Items } from "../resources";
import { ItemType } from "../types";
import {
  ContainerListItems,
  ListItems,
  HeaderList,
} from "../styledComponents/ListItems";
import { useSelector } from "react-redux";
import Item from "./Item";
import { RootState } from "../reducers";

const ItemList = () => {
  const Items = useSelector((state: RootState) => state.orderReducer?.items);
  return (
    <ContainerListItems>
      <div>
        <HeaderList> Menú </HeaderList>
        <hr className="accessory" />
      </div>
      <ListItems>
        {Items.map((i: ItemType) => (
          <Item {...i} key={i.name} />
        ))}
      </ListItems>
    </ContainerListItems>
  );
};

export default ItemList;
