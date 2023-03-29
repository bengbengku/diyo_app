import { createStyles, rem } from "@mantine/core";

export const navbarSmallStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,
    marginBottom: "0.3em",

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
        0.15
      ),
    },
  },
  logoSmallNavbar: {
    width: "30px",
    objectFit: "contain",
    cursor: "pointer",
  },
}));
