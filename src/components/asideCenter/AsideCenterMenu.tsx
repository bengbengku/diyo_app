import React, { useState } from "react";
import { Card, Image, Group, Text, Avatar, Badge, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { asideMenuStyles } from "@/styles/asideCenter/asideMenuStyles";
import { products } from "@/seed/productsSeed";
import formatter from "@/helpers/formatCurrency";
import "./style.css";
import { ProductsInterface } from "@/types/products";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { tableInterface } from "@/types/table";

type Props = {};

const AsideCenterMenu = (props: Props) => {
  const { classes } = asideMenuStyles();
  const itemOrders: ProductsInterface[] = useSelector((state: any) => state.orders);
  const getTable: tableInterface = useSelector((state: any) => state.getTable);
  const [dataProducts, setDataProducts] = useState<ProductsInterface[]>(products);
  const dispatch = useDispatch();

  function handlerCounter(product: ProductsInterface, action: string): void {
    const index = dataProducts.findIndex((item) => item.name === product.name);
    const newData = [...dataProducts];
    if (index !== -1) {
      if (action === "decrement") {
        if (getTable === null) {
          return notifications.show({
            title: "Opps.. Terjadi Kesalahan.",
            message: "Silahkan pilih meja terlebih dahulu! 🤥",
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.red[6],
                borderColor: theme.colors.red[6],

                "&::before": { backgroundColor: theme.white },
              },

              title: { color: theme.white },
              description: { color: theme.white },
              closeButton: {
                color: theme.white,
                "&:hover": { backgroundColor: theme.colors.red[7] },
              },
            }),
          });
        }
        if (dataProducts[index].count < 1) {
          return;
        }
        const newData = [...dataProducts];
        newData[index].count -= 1;
      } else if (action === "increment") {
        if (getTable === null) {
          return notifications.show({
            title: "Opps.. Terjadi Kesalahan.",
            message: "Silahkan pilih meja terlebih dahulu! 🤥",
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.red[6],
                borderColor: theme.colors.red[6],

                "&::before": { backgroundColor: theme.white },
              },

              title: { color: theme.white },
              description: { color: theme.white },
              closeButton: {
                color: theme.white,
                "&:hover": { backgroundColor: theme.colors.red[7] },
              },
            }),
          });
        }
        const newData = [...dataProducts];
        newData[index].count += 1;
      }
    }
    setDataProducts(newData);
  }

  function getOrdersHandler(product: ProductsInterface) {
    if (product.count < 1) {
      if (product.count < 1 && itemOrders.length > 0) {
        const newData = itemOrders.filter((item) => item.name !== product.name);
        return dispatch({ type: "GET_ORDERS", payload: newData });
      }
      return notifications.show({
        title: "Opps.. Terjadi Kesalahan.",
        message: `Jumlah order ${product.name} kosong. 🤥`,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
    }

    if (getTable === null) {
      return notifications.show({
        title: "Opps.. Terjadi Kesalahan.",
        message: "Silahkan pilih meja terlebih dahulu! 🤥",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
    }
    const newData = [...itemOrders];
    const index = newData.findIndex((data) => data.name === product.name);
    if (itemOrders.length > index) {
      dispatch({ type: "GET_ORDERS", payload: [...itemOrders, product] });
    }

    if (index !== -1) {
      newData[index] = {
        ...newData[index],
        count: product.count,
      };
      dispatch({ type: "GET_ORDERS", payload: newData });
    }
  }

  return (
    <div className="menu-container scrollbar">
      {dataProducts.map((product, index) => (
        <Card withBorder radius="md" className={classes.card} key={index}>
          <Card.Section mb="sm">
            <Image src={product.image} alt={product.name} height={180} />
          </Card.Section>

          <Badge variant="filled" color="red.5">
            {product.category}
          </Badge>

          <Group mt="lg">
            <Avatar src={product.image} radius="sm" />
            <div>
              <Text fw={500}>{product.name}</Text>
              <Text fz="xs" c="dimmed">
                {formatter.format(product.price)}
              </Text>
            </div>
          </Group>

          <Card.Section className={classes.footer}>
            <Group position="apart">
              <Group spacing={5}>
                <span
                  style={{ fontSize: "12px", cursor: "pointer" }}
                  onClick={() => handlerCounter(product, "decrement")}
                >
                  ➖
                </span>
                <Text c="dimmed" fw={600}>
                  {product.count}
                </Text>
                <span
                  style={{ fontSize: "12px", cursor: "pointer" }}
                  onClick={() => handlerCounter(product, "increment")}
                >
                  ➕
                </span>
              </Group>
              <Group spacing={0}>
                <Button
                  color="red.5"
                  radius="xl"
                  size="xs"
                  onClick={() => getOrdersHandler(product)}
                >
                  Add to order
                </Button>
              </Group>
            </Group>
          </Card.Section>
        </Card>
      ))}
    </div>
  );
};

export default AsideCenterMenu;
