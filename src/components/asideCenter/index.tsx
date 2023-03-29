import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asideCenterStyles } from "@/styles/asideCenter/asideCenterStyles";
import { Card, Text, SimpleGrid, UnstyledButton, Badge } from "@mantine/core";
import { tableSeed } from "@/seed/tableSeed";
import ColorSwatchComponent from "./ColorSwatchComponent";
import { tableInterface } from "@/types/table";
import Cookies from "js-cookie";
import { IconArmchair2 } from "@tabler/icons-react";

type Props = {
  tables: tableInterface[];
  seeds: tableInterface[];
};

const AsideCenterHome = ({ tables, seeds }: Props) => {
  const { classes, theme } = asideCenterStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.set("tables", JSON.stringify(tables));
    dispatch({ type: "ADD_TABLES", payload: tables });
  }, [seeds]);

  async function getTableSelected(item: tableInterface) {
    dispatch({ type: "GET_TABLE", payload: item });
  }

  const items = seeds?.map((item) => (
    <UnstyledButton
      key={item.name}
      className={classes.item}
      style={{
        backgroundColor:
          item.status === "Available"
            ? "#fff"
            : item.status === "Seated"
            ? "#FA5252"
            : item.status === "Ordered"
            ? "#FCC419"
            : item.status === "Billing"
            ? "#339AF0"
            : "",
        border: item.status === "Available" ? "1px solid #f9000046" : "",
      }}
      onClick={() => getTableSelected(item)}
    >
      <IconArmchair2 color={theme.colors["dark"][6]} size="2rem" />
      <Text size="xs" mt={7} fw={600} color="dark.6">
        {item.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
      <div className={classes.legend}>
        <Badge color="red" variant="filled" w="70px">
          Legend
        </Badge>
        <ColorSwatchComponent color={theme.colors.gray[2]} text="Available" />
        <ColorSwatchComponent color={theme.colors.red[5]} text="Seated" />
        <ColorSwatchComponent color={theme.colors.yellow[5]} text="Ordered" />
        <ColorSwatchComponent color={theme.colors.blue[5]} text="Billing" />
      </div>
    </>
  );
};

export default AsideCenterHome;
