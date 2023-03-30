import NavbarComponent from "@/components/navbar";
import React, { useState, useEffect } from "react";
import "./style.css";
import NavbarSmall from "@/components/navbar/NavbarSmall";
import AsideCenterHome from "@/components/asideCenter";
import AsideRight from "@/components/asideRight";
import img from "@/assets/logo-header.png";
import AsideCenterMenu from "@/components/asideCenter/AsideCenterMenu";
import { tableInterface } from "@/types/table";
import { tableSeed } from "@/seed/tableSeed";
import { useSelector } from "react-redux";
import { NotFoundImage } from "@/components/queueOrder";

const Dashboard = () => {
  const [visible, setVisible] = useState<number>(0);
  const [active, setActive] = useState<string>("Home");
  const [isActiveSmall, setIsActiveSmall] = useState<number>(0);
  const [tables, setTables] = useState<tableInterface[]>(tableSeed);
  const seeds: tableInterface[] = useSelector((state: any) => state.tables);

  console.log(active, isActiveSmall);
  return (
    <div className="dashboard-container">
      <div className="navbar">
        {visible === 0 && (
          <NavbarComponent
            active={active}
            setActive={setActive}
            setVisible={setVisible}
            setIsActiveSmall={setIsActiveSmall}
          />
        )}
        {visible === 1 && (
          <NavbarSmall
            setActive={setActive}
            isActiveSmall={isActiveSmall}
            setIsActiveSmall={setIsActiveSmall}
            setVisible={setVisible}
          />
        )}
      </div>
      <div className="aside-center">
        <img className="logo" src={img} alt="logo diyo" />
        {active === "Home" && isActiveSmall === 0 && (
          <AsideCenterHome tables={tables} seeds={seeds} />
        )}
        {active === "Order Queue" && isActiveSmall === 1 && <NotFoundImage />}
        {active === "Menu" && isActiveSmall === 2 && <AsideCenterMenu />}
      </div>
      <div className="aside-right">
        <AsideRight
          setActive={setActive}
          setIsActiveSmall={setIsActiveSmall}
          setTables={setTables}
        />
      </div>
    </div>
  );
};

export default Dashboard;
