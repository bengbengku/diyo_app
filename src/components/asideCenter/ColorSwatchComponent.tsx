import React from "react";
import { Text, ColorSwatch, Group } from "@mantine/core";

type Props = {
  color: string;
  text: string;
};

const ColorSwatchComponent = ({ color, text }: Props) => {
  return (
    <Group position="left" spacing="xs">
      <ColorSwatch
        component="button"
        color={`${color}`}
        sx={{ color: "#fff", cursor: "pointer" }}
      ></ColorSwatch>
      <Text c="dimmed" fw={600}>
        {text}
      </Text>
    </Group>
  );
};

export default ColorSwatchComponent;
