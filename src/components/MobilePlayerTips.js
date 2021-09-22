import React from "react";
import { css } from "@emotion/css";
import { redWrapper } from "../commonCss";

function MobilePlayerTips() {
  return (
    <div className={tipsWrapper}>
      <p>
        <span className={redWrapper}>Тап</span> - для прыжка!
      </p>
    </div>
  );
}

export default MobilePlayerTips;

const tipsWrapper = css`
  text-align: center;
  line-height: 24px;
  padding: 10px;
`;
