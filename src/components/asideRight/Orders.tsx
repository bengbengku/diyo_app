import React from "react";
import { Text, Badge, ActionIcon } from "@mantine/core";
import { IconTrashXFilled } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { ProductsInterface } from "@/types/products";
import formatter from "@/helpers/formatCurrency";
import "./style.css";
import { useDispatch } from "react-redux";

type Props = {};

const Orders = (props: Props) => {
  const dispatch = useDispatch();
  const itemOrders: ProductsInterface[] = useSelector((state: any) => state.orders);

  function handleDeleteOrder(name: string) {
    const newData = itemOrders.filter((item) => item.name !== name);
    dispatch({ type: "GET_ORDERS", payload: newData });
  }

  const total: number = itemOrders.reduce((acc: number, order: ProductsInterface) => {
    return acc + order.price * order.count;
  }, 0);

  return (
    <>
      <Badge color="cyan" size="xs" variant="filled" mt="2em">
        Ordered Menu
      </Badge>
      <div className="orders">
        {itemOrders.map((item, idx) =>
          item.count !== 0 ? (
            <div className="item-order" key={idx}>
              <Text c="dimmed" fz={12} fw={600} style={{ flex: 1 }}>
                {item.name}&nbsp;&nbsp;x {item.count}
              </Text>
              <div className="price">
                <Text c="red.5" fz={12} fw={700}>
                  {formatter.format(item.count * item.price)}
                </Text>
                <ActionIcon
                  className="icon"
                  color="red"
                  onClick={() => handleDeleteOrder(item.name)}
                >
                  <IconTrashXFilled size="1.125rem" />
                </ActionIcon>
              </div>
            </div>
          ) : null
        )}
        <Text c="red.5" fz={12} fw={700} mt={10}>
          <Badge variant="filled">Total</Badge> {formatter.format(total)}
        </Text>
      </div>
    </>
  );
};

export default Orders;
