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
import { usersOrderInterface } from "@/types/usersOrder";
import CurrentBill from "./CurrentBill";
import Bill from "./Bill";

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
  const usersOrder: usersOrderInterface[] = useSelector((state: any) => state.usersOrder);
  const { classes } = asideRightStyles();

  async function addTableStatusSeated() {
    const find = await tables.findIndex((table) => table.name === item.name);
    const updateStatus = { name: item.name, status: Status.SEATED };
    const update = [...tables.slice(0, find), updateStatus, ...tables.slice(find + 1)];

    Cookies.set("tables", JSON.stringify(update));
    dispatch({ type: "ADD_TABLES", payload: update });
    dispatch({ type: "GET_TABLE", payload: updateStatus });
    setTables(update);
  }

  function addTableStatusBilling() {
    const find = tables.findIndex((table) => table.name === item.name);
    const updateStatus = { name: item.name, status: Status.BILLING };
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

  function addOrderHandler() {
    const find = tables.findIndex((table) => table.name === item.name);
    const updateStatus = { name: item.name, status: Status.ORDERED };
    const update = [...tables.slice(0, find), updateStatus, ...tables.slice(find + 1)];

    const orderItems: usersOrderInterface = {
      name: item.name,
      status: updateStatus.status,
      items: orders,
    };

    Cookies.set("tables", JSON.stringify(update));
    dispatch({ type: "ADD_TABLES", payload: update });
    dispatch({ type: "ADD_USERS_ORDER", payload: [...usersOrder, orderItems] });
    dispatch({ type: "REMOVE_TABLE" });
    dispatch({ type: "REMOVE_ORDERS" });
    setTables(update);
    setActive("Home");
    setIsActiveSmall(0);
  }

  function addOrderChangeHandler() {
    setActive("Menu");
    setIsActiveSmall(2);
    const filteredData = usersOrder.filter((order) => order.name === item.name);
    const items: any = filteredData.map((order) => order.items);
    let orderChange = orders.concat(filteredData[0].items);
    if (items) {
      dispatch({ type: "GET_ORDERS", payload: orderChange });
      addTableStatusSeated();
      dispatch({ type: "ADD_USERS_ORDER", payload: [] });
    }
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
            onClick={() => addTableStatusSeated()}
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
      ) : item?.status === Status.ORDERED ? (
        <div className={classes.statusContainer}>
          <Title order={3}>{item.name}</Title>
          <div className={classes.info}>
            <Text fw={600}>Status: </Text>
            <Badge color="yellow.5" variant="filled">
              {item.status}
            </Badge>
          </div>
          <CurrentBill />
          <Button
            color="red.5"
            variant="filled"
            w={200}
            radius={18}
            onClick={() => addOrderChangeHandler()}
          >
            Add Order
          </Button>
          <Button
            color="red.5"
            variant="filled"
            w={200}
            radius={18}
            onClick={() => addTableStatusBilling()}
          >
            Billing
          </Button>
        </div>
      ) : item?.status === Status.BILLING ? (
        <div className={classes.statusContainer}>
          <Title order={3}>{item.name}</Title>
          <div className={classes.info}>
            <Text fw={600}>Status: </Text>
            <Badge color="blue.5" variant="filled">
              {item.status}
            </Badge>
          </div>
          <Bill setTables={setTables} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AsideRight;
