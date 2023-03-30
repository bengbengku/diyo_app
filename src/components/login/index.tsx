import React, { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./style.css";
import img from "@/assets/logo-header.png";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

type Props = {};

const LoginComponent = (props: Props) => {
  const [oneVal, setOneVal] = useState<string>("");
  const [twoVal, setTwoVal] = useState<string>("");
  const [threeVal, setThreeVal] = useState<string>("");
  const [fourVal, setFourVal] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function addInputHandle(i: number) {
    let num = i === 9 ? 0 : i + 1;
    if (!oneVal && !twoVal && !threeVal && !fourVal) {
      setOneVal(num.toString());
    }
    if (oneVal && !twoVal && !threeVal && !fourVal) {
      setTwoVal(num.toString());
    }
    if (oneVal && twoVal && !threeVal && !fourVal) {
      setThreeVal(num.toString());
    }
    if (oneVal && twoVal && threeVal && !fourVal) {
      setFourVal(num.toString());
      console.log(fourVal);
    }
  }

  useEffect(() => {
    let mergeNum = oneVal + twoVal + threeVal + fourVal;
    if (mergeNum && mergeNum !== "1234") {
      notifications.show({
        title: "Opps.. Terjadi Kesalahan.",
        message: "Pin yang anda masukan salah! 🤥",
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
      setOneVal("");
      setTwoVal("");
      setThreeVal("");
      setFourVal("");
    } else if (mergeNum && mergeNum === "1234") {
      dispatch({ type: "LOGIN", payload: mergeNum });
      Cookies.set("user", JSON.stringify(mergeNum));
      notifications.show({
        title: "Horeeee.",
        message: "Anda berhasil login! 🤥",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.blue[6],

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.blue[7] },
          },
        }),
      });
      navigate("/");
    }
  }, [fourVal]);

  return (
    <div className="container">
      <img src={img} width="120" />

      <div className="numpad-wrapper">
        <Text fw={600} fz={12}>
          Enter PIN
        </Text>
        <div className="numpad-input">
          <input
            type="password"
            maxLength={1}
            value={oneVal}
            onChange={(e: any) => setOneVal(e.target.value)}
          />
          <input
            type="password"
            maxLength={1}
            value={twoVal}
            onChange={(e: any) => setTwoVal(e.target.value)}
          />
          <input
            type="password"
            maxLength={1}
            value={threeVal}
            onChange={(e: any) => setThreeVal(e.target.value)}
          />
          <input
            type="password"
            maxLength={1}
            value={fourVal}
            onChange={(e: any) => setFourVal(e.target.value)}
          />
        </div>
      </div>
      <div className="numpad-first">
        {Array.from(new Array(10), (val, i) => i + 1).map((id, i) => (
          <div key={i} onClick={() => addInputHandle(i)}>
            {i === 9 ? 0 : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginComponent;
