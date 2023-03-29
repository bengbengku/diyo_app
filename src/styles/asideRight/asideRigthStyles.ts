import { createStyles, rem } from "@mantine/core";

export const asideRightStyles = createStyles((theme) => ({
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  info: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
}));
