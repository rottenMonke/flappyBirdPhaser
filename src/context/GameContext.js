import React from "react";
import * as Api from "../api";
import { UI_STATE } from "../pages/constants";

export const GameContext = React.createContext({});
export let gameContextApi;

export function GameContextProvider({ children }) {
  const [record, setRecord] = React.useState(Api.getPlayerScore());

  const updateRecord = React.useCallback((newScore) => {
    if (newScore > record) {
      setRecord(newScore);
      Api.setPlayerScore(newScore)
    }
  }, [record])

  const [count, setCount] = React.useState(0);
  const [currentScreen, setCurrentScreen] = React.useState(UI_STATE.MAIN_MENU);
  const contextValue = {
    record,
    count,
    setCount,
    currentScreen,
    setCurrentScreen,
    isPlaying: currentScreen === UI_STATE.RUNNING,
    updateRecord,
  }

  gameContextApi = contextValue;

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
