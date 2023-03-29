import React from "react";
import { QRCodeSVG } from "qrcode.react";
import img from "@/assets/logo-header.png";

type Props = {
  value: string;
};

const QrCode = ({ value }: Props) => {
  return (
    <QRCodeSVG
      value={`${value}`}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={false}
      //   imageSettings={{
      //     src: `${img}`,
      //     x: undefined,
      //     y: undefined,
      //     height: 24,
      //     width: 64,
      //     excavate: true,
      //   }}
    />
  );
};

export default QrCode;
