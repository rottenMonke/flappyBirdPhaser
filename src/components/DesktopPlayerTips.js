import React from "react";
import { css } from "@emotion/css";
import { redWrapper } from "../commonCss";

function DesktopPlayerTips() {
  return (
    <div className={tipsWrapper}>
      <p>
        <span className={redWrapper}>W,J,UP,Space</span> - для прыжка!
      </p>
      <p>
        <span className={redWrapper}>PRESS F</span> - для Полноэкранного режима!
      </p>
    </div>
  );
}

export default DesktopPlayerTips;

const tipsWrapper = css`
  position: absolute;
  top: calc(50% + 122px);
  left: 0px;
  right: 0px;
  white-space: nowrap;
  font-size: 16px;
  text-align: center;

  p {
    padding-bottom: 20px;
  }
`;
