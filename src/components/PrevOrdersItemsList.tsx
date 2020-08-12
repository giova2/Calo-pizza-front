import React from "react";
import { ItemTypeOrder } from "../types";

type myProps = {
  items: ItemTypeOrder[];
};

const PrevOrdersItemsList = (props: myProps) => {
  const [displayItems, setDisplayitems] = React.useState(false);
  const renderItems = () => {
    if (displayItems) {
      return (
        <>
          <span
            onClick={() => setDisplayitems(false)}
            style={{ cursor: "pointer" }}
          >
            <strong>Close</strong>
          </span>
          <ul>
            {props.items.map((item: ItemTypeOrder) => (
              <li>
                {item.name} : {item.quantity}
              </li>
            ))}
          </ul>
        </>
      );
    }
    return (
      <span onClick={() => setDisplayitems(true)} style={{ cursor: "pointer" }}>
        <strong>ITEMS</strong>
      </span>
    );
  };
  return <>{renderItems()}</>;
};

export default PrevOrdersItemsList;
