import React from "react";
import { css, cx } from "@emotion/css";
import { UI_STATE } from "./pages/constants";
import MainMenu from "./pages/MainMenu";
import PlayingUI from "./pages/PlayingUI";
import TryAgain from "./pages/TryAgain";
import { GameContext } from "./context/GameContext";
import { UI_CONTAINER_ID, adjustUIsizeToCanvas } from "./utils/ui";
import useFullScreen from './hooks/useFullScreen';

const container = css`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 800px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const isPlaying = css`
  pointer-events: none;
`;

const navigatingMenu = css`
  pointer-events: all;
`;


const touchableContainer = cx(container, navigatingMenu);
const nonTouchableContainer = cx(container, isPlaying);


export default function UI() {
  const contextValue = React.useContext(GameContext);

  React.useEffect(() => {
    adjustUIsizeToCanvas();
    window.addEventListener("resize", adjustUIsizeToCanvas);
    return () => {
      window.removeEventListener("resize", adjustUIsizeToCanvas);
    };
  }, []);

  useFullScreen();

  let PageToShow = React.useMemo(() => {
    switch (contextValue.currentScreen) {
      case UI_STATE.MAIN_MENU:
        return MainMenu;
      case UI_STATE.RUNNING:
        return PlayingUI;
      case UI_STATE.TRY_AGAIN:
        return TryAgain;
      default:
        break;
    }
  }, [contextValue.currentScreen]);

  const canvasClass = React.useMemo(
    () =>
      contextValue.currentScreen === UI_STATE.RUNNING
        ? nonTouchableContainer
        : touchableContainer,
    [PageToShow]
  );

  return (
    <div id={UI_CONTAINER_ID} className={canvasClass}>
      <PageToShow {...contextValue} />
    </div>
  );
}
