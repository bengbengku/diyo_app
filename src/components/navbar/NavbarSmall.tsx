import { Navbar, Center, Tooltip, UnstyledButton, Stack } from "@mantine/core";
import {
  IconHome2,
  IconCheckbox,
  IconCategory,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { navbarSmallStyles } from "@/styles/navbar/navbarSmallStyles";
import { NavbarSmallLinkData } from "@/types/navbar";
import img from "@/assets/diyo_small.png";

interface NavbarSmallProps {
  isActiveSmall: number;
  setIsActiveSmall: (val: number) => void;
  setVisible: (val: number) => void;
  setActive: (val: string) => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarSmallLinkData) {
  const { classes, cx } = navbarSmallStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconCheckbox, label: "Order Queue" },
  { icon: IconCategory, label: "Menu" },
];

const NavbarSmall = ({
  isActiveSmall,
  setIsActiveSmall,
  setVisible,
  setActive,
}: NavbarSmallProps) => {
  const { classes, cx } = navbarSmallStyles();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === isActiveSmall}
      onClick={() => handleClick(index)}
    />
  ));

  function handleClick(index: number) {
    if (index === 0) {
      setActive("Home");
    }
    if (index === 1) {
      setActive("Order Queue");
    }
    if (index === 2) {
      setActive("Menu");
    }
    setIsActiveSmall(index);
  }

  return (
    <Navbar
      height="100vh"
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
      })}
    >
      <Center>
        <img
          src={img}
          alt="diyo logo small"
          className={classes.logoSmallNavbar}
          onClick={() => setVisible(0)}
        />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarSmall;
