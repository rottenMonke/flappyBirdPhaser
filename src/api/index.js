const LOCAL_STORAGE_KEY = "flappyBirdPhaser";

export function setPlayerScore(score) {
  localStorage.setItem(LOCAL_STORAGE_KEY, score);
}

export function getPlayerScore() {
  if(+localStorage.getItem(LOCAL_STORAGE_KEY) === 0) localStorage.setItem(LOCAL_STORAGE_KEY, 0);
  return +localStorage.getItem(LOCAL_STORAGE_KEY);
}