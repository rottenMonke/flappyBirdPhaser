import React from "react";

function fullscreenCallback(event) {
  if (event.isComposing || event.code === "KeyF") {
    window.toggleFullscreen();
    return;
  }
}

function addEvents() {
  document.addEventListener("keydown", fullscreenCallback);
}
function removeEvents() {
  document.removeEventListener("keydown", fullscreenCallback);
}

const useFullScreen = () => {
  React.useEffect(() => {
    addEvents();
    return () => {
      removeEvents();
    };
  }, []);
};

export default useFullScreen;
