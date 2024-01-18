import React from "react";
// import { Items } from "../resources";
import { ItemType, ItemTypeOrder, Sizes, TypeOrderReducer } from "../types";
import {
  ContainerListItems,
  ListItems,
  HeaderList,
  ButtonSize,
  SearchDiv,
  SearchInput,
} from "../styledComponents/ListItems";
import { useSelector } from "react-redux";
import Item from "./Item";
import Loading from "./Loading";
import { Items as ItemsC } from "../resources";
import { RootState } from "../reducers";

const getCountOnSize = (items: ItemType[], size: Sizes) =>
  items && items.length > 0
      ? items.map((item: ItemType) => {
          return item.size === size ? 1 : 0;
        }).reduce((total: any, num: any) => total + num)
      : 0;

const ItemList = () => {
  const [filterSize, setFilterSize] = React.useState(Object.values(Sizes)[2]);
  const [filterName, setFilterName] = React.useState("");
  const orderReducer: TypeOrderReducer = useSelector(
    (state: RootState) => state.orderReducer
  );
  const Items = orderReducer.items;
  const numSizeSmall = getCountOnSize(Items, Sizes.small)
  const numSizeMedium = getCountOnSize(Items, Sizes.medium)
  const numSizeLarge = getCountOnSize(Items, Sizes.large)

  const numSizes = { small: 0, medium: 0, large: 0 };
  numSizes[Sizes.small] = numSizeSmall;
  numSizes[Sizes.medium] = numSizeMedium;
  numSizes[Sizes.large] = numSizeLarge;
  
  React.useEffect(() => {
    Object.values(Sizes).forEach((val) => {
      if (numSizes[val] > 0) {
        setFilterSize(val);
      }
    });
  }, [numSizeSmall, numSizeMedium, numSizeLarge]);

  const renderItems = () => {
    return Items?.map((i: ItemType) => {
      const itemOrder: ItemTypeOrder | undefined = orderReducer.itemsOrder.find(
        (item: ItemTypeOrder) => item.id === i.id
      );
      const quantity = itemOrder && itemOrder.quantity ? itemOrder.quantity : 0;
      if (
        filterName === "" ||
        i.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      ) {
        return (
          <Item
            {...i}
            quantity={quantity}
            filterSize={filterSize}
            key={i.name + i.id}
          />
        );
      }
      return "";
    });
  };
  return (
    <ContainerListItems>
      <div>
        <HeaderList> Menú </HeaderList>
        <hr className="accessory" />

        {ItemsC === Items && <Loading show={true} customHeight="menuList" />}

        <span>
          <strong>Sizes:</strong>
        </span>
        {Object.values(Sizes).map((val) => {
          if (numSizes[val] > 0) {
            return (
              <ButtonSize
                key={val}
                selected={val === filterSize}
                onClick={() => setFilterSize(val)}
              >
                {val}
              </ButtonSize>
            );
          }
          return "";
        })}
        <SearchDiv>
          <SearchInput
            placeholder="Look for your Pizza"
            onKeyUp={(e: any) => setFilterName(e.target.value)}
          />
        </SearchDiv>
      </div>
      <ListItems>{renderItems()}</ListItems>
    </ContainerListItems>
  );
};

export default ItemList;
