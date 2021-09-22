import React from "react";
import { css } from "@emotion/css";
import Button from "../components/Button";
import { UI_STATE } from "./constants";
import DesktopPlayerTips from "../components/DesktopPlayerTips";
import MobilePlayerTips from "../components/MobilePlayerTips";
import { container } from "../commonCss";

const bestResult = css`
  position: absolute;
  white-space: nowrap;
  color: white;
  top: 40px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function MainMenu({ setCurrentScreen, record, appParams }) {
  
  const setRunningScreen = React.useCallback(
    () => setCurrentScreen(UI_STATE.RUNNING),
    []
  );

  return (
    <div className={container}>
      {record !== 0 && (
        <p className={bestResult}>Ваш лучший результат - {record}</p>
      )}
      <Button onClick={setRunningScreen}>Полетели</Button>
      {window.innerWidth > 750 ? <DesktopPlayerTips /> : <MobilePlayerTips />}
    </div>
  );
}
