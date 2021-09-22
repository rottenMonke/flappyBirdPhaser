export const UI_CONTAINER_ID = "UI_CONTAINER_ID";
import { css } from "@emotion/css";

const fullScreenUI = css`
  & #${UI_CONTAINER_ID} {
    width: 100% !important;
    height: 100% !important;
    margin: 0px !important;
  }
`;

const fullScreenCanvas = css`
  & {
    overflow: hidden;
  }
  & canvas {
    width: auto !important;
    height: 100% !important;
    margin: 0 !important;
  }
`;

export function adjustUIsizeToCanvas() {
  setTimeout(() => {
    const isMobile = window.innerWidth < 601;
    const isVertical = window.innerWidth < window.innerHeight;
    if (isMobile && isVertical) {
      makeMobileUI();
      makeMobileCanvas();
    } else {
      removeFullscreenClasses();
      copyCanvasStyleToUI();
    }
  }, 0);
}

export function copyCanvasStyleToUI() {
  document.getElementById(
    UI_CONTAINER_ID
  ).style.cssText = document.querySelector("canvas").style.cssText;
}

export function makeMobileUI() {
  document.body.classList.add(fullScreenUI);
}

export function makeMobileCanvas() {
  document.body.classList.add(fullScreenCanvas);
}

export function removeFullscreenClasses() {
  document.body.classList.remove(fullScreenUI);
  document.body.classList.remove(fullScreenCanvas);
}
