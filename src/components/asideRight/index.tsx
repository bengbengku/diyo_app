import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Stats from "./Stats";
import { tableInterface, Status } from "@/types/table";
import { asideRightStyles } from "@/styles/asideRight/asideRigthStyles";
import { Text, Title, Badge, Button } from "@mantine/core";
import Cookies from "js-cookie";
import QrCode from "../qrcode";
import Orders from "./Orders";
import { ProductsInterface } from "@/types/products";

type Props = {
  setActive: (val: string) => void;
  setIsActiveSmall: (val: number) => void;
  setTables: (val: tableInterface[]) => void;
};

const AsideRight = ({ setActive, setIsActiveSmall, setTables }: Props) => {
  const dispatch = useDispatch();
  const item: tableInterface = useSelector((state: any) => state.getTable);
  const tables: tableInterface[] = useSelector((state: any) => state.tables);
  const orders: ProductsInterface[] = useSelector((state: any) => state.orders);
  const { classes } = asideRightStyles();

  async function updateStatusHandler() {
    const find = await tables.findIndex((table) => table.name === item.name);
    const updateStatus = { name: item.name, status: Status.SEATED };
    const update = [...tables.slice(0, find), updateStatus, ...tables.slice(find + 1)];

    Cookies.set("tables", JSON.stringify(update));
    dispatch({ type: "ADD_TABLES", payload: update });
    dispatch({ type: "GET_TABLE", payload: updateStatus });
    setTables(update);
  }

  function showOrderMenuHandler() {
    setActive("Menu");
    setIsActiveSmall(2);
  }

  const allCountZero = orders.every((order) => order.count === 0);

  async function addOrderHandler() {
    const find = await tables.findIndex((table) => table.name === item.name);
    const updateStatus = { name: item.name, status: Status.ORDERED };
    const update = [...tables.slice(0, find), updateStatus, ...tables.slice(find + 1)];

    Cookies.set("tables", JSON.stringify(update));
    dispatch({ type: "ADD_TABLES", payload: update });
    dispatch({ type: "GET_TABLE", payload: updateStatus });
    setTables(update);
  }

  return (
    <>
      <Stats />
      {item?.status === Status.AVAILABLE ? (
        <div className={classes.statusContainer}>
          <Title order={3}>{item.name}</Title>
          <div className={classes.info}>
            <Text fw={600}>Status: </Text>
            <Badge color="gray.6" variant="filled">
              {item.status}
            </Badge>
          </div>
          <QrCode value="https://www.diyo.app/" />
          <Button
            color="red.5"
            variant="filled"
            w={200}
            radius={18}
            onClick={() => updateStatusHandler()}
          >
            Print QR
          </Button>
        </div>
      ) : item?.status === Status.SEATED ? (
        <div className={classes.statusContainer}>
          <Title order={3}>{item.name}</Title>
          <div className={classes.info}>
            <Text fw={600}>Status: </Text>
            <Badge color="red.5" variant="filled">
              {item.status}
            </Badge>
          </div>
          {orders.length > 0 && !allCountZero && <Orders />}

          {orders.length > 0 && !allCountZero ? (
            <Button
              color="red.5"
              variant="filled"
              w={200}
              radius={18}
              onClick={() => addOrderHandler()}
            >
              Add Order
            </Button>
          ) : (
            <Button
              color="red.5"
              variant="filled"
              w={200}
              radius={18}
              onClick={showOrderMenuHandler}
            >
              Make an Order
            </Button>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AsideRight;
