import React from "react";
import { css } from '@emotion/css'
import Button from '../components/Button';
import { UI_STATE } from "./constants";
import { restartGame } from "../Game"
import { container } from "../commonCss";

const gameScoreContainer = css`
  border: 2px solid #ffc107;
  background: #ded895;
  padding: 20px;
`;

const listItem = css`
  margin-top: 20px;
`;

const controlContainer = css`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;

const controlButton = css`
  width: 35%;
  line-height: 20px;
`;

export default function TryAgain({ count, setCurrentScreen, record }) {
  const setRunningScreen = React.useCallback(
    () => { 
      setCurrentScreen(UI_STATE.RUNNING);
      restartGame()
    }, []
  );

  const setMainMenuScreen = React.useCallback(
    () => { 
      setCurrentScreen(UI_STATE.MAIN_MENU);
      restartGame()
    }, []
  );

  return (
    <div className={container}>
      <div>
        <div className={gameScoreContainer}>
          <div>Текущий результат  - {count}</div>
          {record !== 0 && <div className={listItem}>
            <p>Ваш лучший результат - {record}</p>
          </div>}
        </div>
      <div className={controlContainer}>
        <Button className={controlButton} onClick={setRunningScreen}>
          Ещё раз
        </Button>
        <Button className={controlButton} onClick={setMainMenuScreen}>
          Главное меню
        </Button>
      </div>
      </div>
    </div>
  );
}

