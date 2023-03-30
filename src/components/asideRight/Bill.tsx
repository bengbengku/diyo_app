import React, { useState } from "react";
import { Text, Badge, Radio, Flex, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import formatter from "@/helpers/formatCurrency";
import "./style.css";
import { useDispatch } from "react-redux";
import { Status, tableInterface } from "@/types/table";
import { usersOrderInterface } from "@/types/usersOrder";
import Cookies from "js-cookie";

type Props = {
  setTables: (val: tableInterface[]) => void;
};

const Bill = ({ setTables }: Props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("cash");
  const usersOrder: usersOrderInterface[] = useSelector((state: any) => state.usersOrder);
  const getTable: tableInterface = useSelector((state: any) => state.getTable);
  const tables: tableInterface[] = useSelector((state: any) => state.tables);

  const filteredData = usersOrder.filter((order) => order.name === getTable.name);
  const totalAmount = filteredData.reduce((total, order) => {
    return (
      total +
      order.items.reduce((subtotal, item) => {
        return subtotal + item.count * item.price;
      }, 0)
    );
  }, 0);

  function paymentHandler() {
    const find = tables.findIndex((table) => table.name === getTable.name);
    const updateStatus = { name: getTable.name, status: Status.AVAILABLE };
    const update = [...tables.slice(0, find), updateStatus, ...tables.slice(find + 1)];

    Cookies.set("tables", JSON.stringify(update));
    dispatch({ type: "ADD_TABLES", payload: update });
    dispatch({ type: "GET_TABLE", payload: updateStatus });
    setTables(update);

    let newUsersOrder = usersOrder.filter((order) => order.name !== getTable.name);
    dispatch({ type: "ADD_USERS_ORDER", payload: newUsersOrder });
  }

  return (
    <>
      <div className="orders">
        <Radio.Group name="choosePayment" label="Select payment" value={value} onChange={setValue}>
          <Flex direction="column" gap={12} mt="xs" mb="lg">
            <Radio value="cash" label="Cash" fw={600} />
            <Radio value="creditCard" label="Credit Card" fw={600} />
            <Radio value="debitCard" label="Debit Card" fw={600} />
            <Radio value="qris" label="QRIS" fw={600} />
          </Flex>
        </Radio.Group>
        {totalAmount !== 0 && (
          <Text c="red.5" fz={12} fw={700} mt={10}>
            <Badge variant="filled">Total</Badge> {formatter.format(totalAmount)}
          </Text>
        )}
      </div>
      <Button
        color="red.5"
        variant="filled"
        w={200}
        radius={18}
        disabled={totalAmount === 0}
        onClick={paymentHandler}
      >
        Payment
      </Button>
    </>
  );
};

export default Bill;
