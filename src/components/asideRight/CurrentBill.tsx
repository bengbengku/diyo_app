import React from "react";
import { Text, Badge } from "@mantine/core";
import { useSelector } from "react-redux";
import formatter from "@/helpers/formatCurrency";
import "./style.css";
import { useDispatch } from "react-redux";
import { tableInterface } from "@/types/table";
import { usersOrderInterface } from "@/types/usersOrder";

type Props = {};

const CurrentBill = (props: Props) => {
  const dispatch = useDispatch();
  const usersOrder: usersOrderInterface[] = useSelector((state: any) => state.usersOrder);
  const getTable: tableInterface = useSelector((state: any) => state.getTable);

  const filteredData = usersOrder.filter((order) => order.name === getTable.name);
  const totalAmount = filteredData.reduce((total, order) => {
    return (
      total +
      order.items.reduce((subtotal, item) => {
        return subtotal + item.count * item.price;
      }, 0)
    );
  }, 0);

  return (
    <>
      <Badge color="blue" size="xs" variant="filled" mt="2em">
        Current Bill
      </Badge>
      <div className="orders">
        {usersOrder
          .filter((orders) => orders.name === getTable.name)
          .map((order, idx) =>
            order.items.map((item, idx) =>
              item.count !== 0 ? (
                <div className="item-order" key={idx}>
                  <Text c="dimmed" fz={12} fw={600} style={{ flex: 1 }}>
                    {item.name}&nbsp;&nbsp;x {item.count}
                  </Text>
                  <div className="price">
                    <Text c="red.5" fz={12} fw={700}>
                      {formatter.format(item.count * item.price)}
                    </Text>
                  </div>
                </div>
              ) : null
            )
          )}
        <Text c="red.5" fz={12} fw={700} mt={10}>
          <Badge variant="filled">Total</Badge> {formatter.format(totalAmount)}
        </Text>
      </div>
    </>
  );
};

export default CurrentBill;
