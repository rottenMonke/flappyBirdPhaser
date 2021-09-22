import React from "react";
import { css, cx } from "@emotion/css";

const button = css`
  display: block;
  padding: 20px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid #ffc107;
  background: #ded895; 
  @media (max-width: 750px) {
    padding: 10px;
  }
`;

export default function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={cx(button,className)}>
      {children}
    </button>
  );
}
