import { Navbar, Group, Code, ActionIcon } from "@mantine/core";
import { navbarStyles } from "@/styles/navbar/navbarStyles";
import {
  IconHome,
  IconCategory,
  IconCheckbox,
  IconSwitchHorizontal,
  IconLogout,
  IconArrowBigLeftLinesFilled,
} from "@tabler/icons-react";
import { NavbarLinkData } from "@/types/navbar";

interface PropsNavbarComponent {
  active: string;
  setActive: (val: string) => void;
  setVisible: (val: number) => void;
  setIsActiveSmall: (val: number) => void;
}

const data = [
  { link: "", label: "Home", icon: IconHome },
  { link: "", label: "Order Queue", icon: IconCheckbox },
  { link: "", label: "Menu", icon: IconCategory },
];

const NavbarComponent = ({
  active,
  setActive,
  setVisible,
  setIsActiveSmall,
}: PropsNavbarComponent) => {
  const { classes, cx } = navbarStyles();
  const links = data.map((item: NavbarLinkData) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => handlerClickLink(event, item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  function handlerClickLink(e: React.MouseEvent<HTMLElement>, label: string) {
    e.preventDefault();
    setActive(label);
    if (label === "Home") {
      setIsActiveSmall(0);
    }
    if (label === "Order Queue") {
      setIsActiveSmall(1);
    }
    if (label === "Menu") {
      setIsActiveSmall(2);
    }
  }

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Code className={classes.version}>v1.1.1</Code>
          <ActionIcon color="red" variant="light" size="lg" onClick={() => setVisible(1)}>
            <IconArrowBigLeftLinesFilled size="1.625rem" />
          </ActionIcon>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarComponent;
