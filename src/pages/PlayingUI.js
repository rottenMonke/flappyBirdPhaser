import React from "react";
import { css } from '@emotion/css'
import { PIPE_PASSED_COUNTER_ID } from './constants';

let counterElement;

export function updateCounter(value) {
  counterElement.textContent = value;
}

const counter = css`
    position: absolute;
    font-size: 40px;
    color: white;
    top: 40px;
    left: 50%;
    transform: translate(-50%,-50%);
    @media (max-width: 750px) {
      font-size: 20px;
    }
`


export default function PlayingUI() {

  React.useEffect(() => {
    counterElement = document.getElementById(PIPE_PASSED_COUNTER_ID)
  },[]) 

  return (
      <h1 id={PIPE_PASSED_COUNTER_ID} className={counter}>0</h1>
  );
}

